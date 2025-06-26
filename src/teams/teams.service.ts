import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Team, TeamMember, User, CreditPeriod, $Enums } from '@prisma/client';
import {
  CreateTeamDto,
  UpdateTeamDto,
  AddMemberDto,
  UpdateMemberDto,
} from './dto';
import { PrismaService } from '../core/services/prisma.service';
import { FileCategory } from '../storage/dto';
import { StorageService, FileInfo } from '../storage/storage.service';

@Injectable()
export class TeamsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  // Admin functions
  async createTeam(
    createTeamDto: CreateTeamDto,
    leaderId: string,
  ): Promise<Team> {
    // Verify lead user exists
    const leader = await this.findUserById(leaderId);
    if (!leader) {
      throw new NotFoundException('Leader user not found');
    }

    const teamData: any = {
      name: createTeamDto.name,
      leadID: leaderId,
      totalCredits: createTeamDto.totalCredits || 0,
    };

    // Handle team photo upload
    if (createTeamDto.photo) {
      const fileInfo: FileInfo = await this.storageService.uploadFile({
        fileData: createTeamDto.photo,
        fileName: `team-${createTeamDto.name}`,
        category: FileCategory.PROFILE,
      });
      teamData.photo = fileInfo.filePath;
    }

    // Add deletedAt field for soft delete
    teamData.deletedAt = null;

    const savedTeam = await this.prisma.team.create({
      data: teamData,
    });

    // Add leader as team member with admin privileges
    await this.prisma.teamMember.create({
      data: {
        teamID: savedTeam.id,
        userID: leaderId,
        maxCredit: 0, // Unlimited for leader
        creditPeriod: $Enums.CreditPeriod.MONTHLY,
        deletedAt: null, // Initialize deletedAt for soft delete
      },
    });

    return savedTeam;
  }

  async getAllTeams(): Promise<Team[]> {
    return this.prisma.team.findMany({
      where: { deletedAt: null },
    });
  }

  async getTeamById(teamId: string): Promise<Team> {
    const team = await this.prisma.team.findFirst({
      where: {
        id: teamId,
        deletedAt: null,
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async updateTeam(
    teamId: string,
    updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    const team = await this.getTeamById(teamId);

    const updateData: any = {};

    // Handle team photo upload
    if (updateTeamDto.photo) {
      // Delete old photo if exists
      if (team.photo) {
        await this.storageService.deleteFile(team.photo);
      }

      const fileInfo: FileInfo = await this.storageService.uploadFile({
        fileData: updateTeamDto.photo,
        fileName: `team-${team.name}`,
        category: FileCategory.PROFILE,
      });
      updateData.photo = fileInfo.filePath;
    }

    // Update other fields
    if (updateTeamDto.name) updateData.name = updateTeamDto.name;
    if (updateTeamDto.totalCredits !== undefined)
      updateData.totalCredits = updateTeamDto.totalCredits;

    return this.prisma.team.update({
      where: { id: teamId },
      data: updateData,
    });
  }

  async deleteTeam(teamId: string): Promise<void> {
    const team = await this.getTeamById(teamId);

    // Soft delete all team members
    await this.prisma.teamMember.updateMany({
      where: { teamID: teamId },
      data: { deletedAt: new Date() },
    });

    // Soft delete team
    await this.prisma.team.update({
      where: { id: teamId },
      data: { deletedAt: new Date() },
    });
  }

  // Team member management
  async addMember(
    teamId: string,
    addMemberDto: AddMemberDto,
  ): Promise<TeamMember> {
    const team = await this.getTeamById(teamId);

    // Find user by email
    const user = await this.findUserByEmail(addMemberDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user is already a member
    const existingMember = await this.findTeamMember(teamId, user.id);
    if (existingMember) {
      throw new ConflictException('User is already a team member');
    }

    return this.prisma.teamMember.create({
      data: {
        teamID: teamId,
        userID: user.id,
        maxCredit: addMemberDto.maxCredit || 0,
        creditPeriod: addMemberDto.creditPeriod || $Enums.CreditPeriod.MONTHLY,
        deletedAt: null, // Initialize deletedAt for soft delete
      },
    });
  }

  async removeMember(teamId: string, userEmail: string): Promise<void> {
    const team = await this.getTeamById(teamId);
    const user = await this.findUserByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Don't allow removing team leader
    if (team.leadID === user.id) {
      throw new ForbiddenException('Cannot remove team leader');
    }

    const member = await this.findTeamMember(teamId, user.id);
    if (!member) {
      throw new NotFoundException('User is not a team member');
    }

    await this.prisma.teamMember.update({
      where: { id: member.id },
      data: { deletedAt: new Date() },
    });
  }

  async updateMember(
    teamId: string,
    userEmail: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<TeamMember> {
    await this.getTeamById(teamId); // Verify team exists

    const user = await this.findUserByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const member = await this.findTeamMember(teamId, user.id);
    if (!member) {
      throw new NotFoundException('User is not a team member');
    }

    const updateData: any = {};
    if (updateMemberDto.maxCredit !== undefined)
      updateData.maxCredit = updateMemberDto.maxCredit;
    if (updateMemberDto.creditPeriod)
      updateData.creditPeriod = updateMemberDto.creditPeriod;

    return this.prisma.teamMember.update({
      where: { id: member.id },
      data: updateData,
    });
  }

  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    return this.prisma.teamMember.findMany({
      where: {
        teamID: teamId,
        deletedAt: null,
      },
    });
  }

  async getUserTeams(userId: string): Promise<Team[]> {
    const teamMembers = await this.prisma.teamMember.findMany({
      where: {
        userID: userId,
        deletedAt: null,
      },
      include: {
        team: true,
      },
    });

    return teamMembers
      .filter((member) => member.team && member.team.deletedAt === null)
      .map((member) => member.team!);
  }

  async isTeamLeader(teamId: string, userId: string): Promise<boolean> {
    const team = await this.getTeamById(teamId);
    return team.leadID === userId;
  }

  async isTeamMember(teamId: string, userId: string): Promise<boolean> {
    const member = await this.findTeamMember(teamId, userId);
    return !!member;
  }

  private async findUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  private async findTeamMember(
    teamId: string,
    userId: string,
  ): Promise<TeamMember | null> {
    return this.prisma.teamMember.findFirst({
      where: {
        teamID: teamId,
        userID: userId,
        deletedAt: null,
      },
    });
  }

  getTeamPhotoUrl(photo?: string): string | null {
    if (!photo) return null;
    return this.storageService.getFileUrl(photo);
  }
}

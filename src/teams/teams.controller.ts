import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  UpdateTeamDto,
  AddMemberDto,
  UpdateMemberDto,
  UpdateTeamResponseDto,
  AddMemberResponseDto,
  RemoveMemberResponseDto,
  UpdateMemberResponseDto,
  TeamDto,
  GetTeamMembersResponseDto,
  GetMyTeamsResponseDto,
} from './dto';
import { TeamsService } from './teams.service';
import { User, SessionUser } from '../core/decorators/user.decorator';
import { AuthGuard } from '../core/guards/auth.guard';

@ApiTags('teams')
@Controller('teams')
@UseGuards(AuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // Team leader endpoints
  @Put(':teamId')
  async updateTeam(
    @Param('teamId') teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @User() user: SessionUser,
  ): Promise<UpdateTeamResponseDto> {
    const isLeader = await this.teamsService.isTeamLeader(
      teamId,
      user.userId.toString(),
    );
    if (!isLeader && !user.isAdmin) {
      throw new ForbiddenException('Only team leaders can update team details');
    }

    const team = await this.teamsService.updateTeam(teamId, updateTeamDto);

    return {
      message: 'Team updated successfully',
      team: {
        id: team.id,
        name: team.name,
        photo: team.photo,
        photoUrl: this.teamsService.getTeamPhotoUrl(team.photo),
        leadID: team.leadID,
        totalCredits: team.totalCredits,
        createdAt: team.createdAt,
      },
    };
  }

  @Post(':teamId/members')
  async addMember(
    @Param('teamId') teamId: string,
    @Body() addMemberDto: AddMemberDto,
    @User() user: SessionUser,
  ): Promise<AddMemberResponseDto> {
    const isLeader = await this.teamsService.isTeamLeader(
      teamId,
      user.userId.toString(),
    );
    if (!isLeader && !user.isAdmin) {
      throw new ForbiddenException('Only team leaders can add members');
    }

    const member = await this.teamsService.addMember(teamId, addMemberDto);

    return {
      message: 'Member added successfully',
      member: {
        id: member.id,
        teamID: member.teamID,
        userID: member.userID,
        maxCredit: member.maxCredit,
        creditPeriod: member.creditPeriod,
        createdAt: member.createdAt,
      },
    };
  }

  @Delete(':teamId/members/:userId')
  async removeMember(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
    @User() user: SessionUser,
  ): Promise<RemoveMemberResponseDto> {
    const isLeader = await this.teamsService.isTeamLeader(
      teamId,
      user.userId.toString(),
    );
    if (!isLeader && !user.isAdmin) {
      throw new ForbiddenException('Only team leaders can remove members');
    }

    await this.teamsService.removeMember(teamId, userId);

    return {
      message: 'Member removed successfully',
    };
  }

  @Put(':teamId/members/:userId')
  async updateMember(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @User() user: SessionUser,
  ): Promise<UpdateMemberResponseDto> {
    const isLeader = await this.teamsService.isTeamLeader(
      teamId,
      user.userId.toString(),
    );
    if (!isLeader && !user.isAdmin) {
      throw new ForbiddenException('Only team leaders can update members');
    }

    const member = await this.teamsService.updateMember(
      teamId,
      userId,
      updateMemberDto,
    );

    return {
      message: 'Member updated successfully',
      member: {
        id: member.id,
        teamID: member.teamID,
        userID: member.userID,
        maxCredit: member.maxCredit,
        creditPeriod: member.creditPeriod,
        createdAt: member.createdAt,
      },
    };
  }

  // Team member endpoints
  @Get(':teamId')
  async getTeam(
    @Param('teamId') teamId: string,
    @User() user: SessionUser,
  ): Promise<TeamDto> {
    const isMember = await this.teamsService.isTeamMember(
      teamId,
      user.userId.toString(),
    );
    if (!isMember && !user.isAdmin) {
      throw new ForbiddenException('Only team members can view team details');
    }

    const team = await this.teamsService.getTeamById(teamId);

    return {
      id: team.id,
      name: team.name,
      photo: team.photo,
      photoUrl: this.teamsService.getTeamPhotoUrl(team.photo),
      leadID: team.leadID,
      totalCredits: team.totalCredits,
      createdAt: team.createdAt,
    };
  }

  @Get(':teamId/members')
  async getTeamMembers(
    @Param('teamId') teamId: string,
    @User() user: SessionUser,
  ): Promise<GetTeamMembersResponseDto> {
    const isMember = await this.teamsService.isTeamMember(
      teamId,
      user.userId.toString(),
    );
    if (!isMember && !user.isAdmin) {
      throw new ForbiddenException(
        'Only team members can view team member list',
      );
    }

    const members = await this.teamsService.getTeamMembers(teamId);

    return {
      message: 'Team members retrieved successfully',
      members: members.map((member) => ({
        id: member.id,
        teamID: member.teamID,
        userID: member.userID,
        maxCredit: member.maxCredit,
        creditPeriod: member.creditPeriod,
        createdAt: member.createdAt,
      })),
    };
  }

  @Get('my-teams')
  async getMyTeams(@User() user: SessionUser): Promise<GetMyTeamsResponseDto> {
    const teams = await this.teamsService.getUserTeams(user.userId.toString());

    return {
      message: 'User teams retrieved successfully',
      teams: teams.map((team) => ({
        id: team.id,
        name: team.name,
        photo: team.photo,
        photoUrl: this.teamsService.getTeamPhotoUrl(team.photo),
        leadID: team.leadID,
        totalCredits: team.totalCredits,
        createdAt: team.createdAt,
      })),
    };
  }

  @Get('test')
  test() {
    return { message: 'Teams endpoints are working!' };
  }
}
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateTeamResponseDto,
  GetAllTeamsResponseDto,
  UpdateTeamAsAdminResponseDto,
  DeleteTeamResponseDto,
} from './dto';
import { AdminGuard } from '../core/guards/admin.guard';
import { CreateTeamDto, UpdateTeamDto } from '../teams/dto';
import { TeamsService } from '../teams/teams.service';

@ApiTags('admin/teams')
@Controller('admin/teams')
@UseGuards(AdminGuard)
export class TeamsAdminController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team (Admin only)' })
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<CreateTeamResponseDto> {
    const team = await this.teamsService.createTeam(
      createTeamDto,
      createTeamDto.leaderId,
    );

    return {
      message: 'Team created successfully',
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

  @Get()
  @ApiOperation({ summary: 'Get all teams (Admin only)' })
  async getAllTeams(): Promise<GetAllTeamsResponseDto> {
    const teams = await this.teamsService.getAllTeams();

    return {
      message: 'Teams retrieved successfully',
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

  @Put(':teamId')
  @ApiOperation({ summary: 'Update team as admin' })
  async updateTeamAsAdmin(
    @Param('teamId') teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<UpdateTeamAsAdminResponseDto> {
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

  @Delete(':teamId')
  @ApiOperation({ summary: 'Delete team (Admin only)' })
  async deleteTeam(
    @Param('teamId') teamId: string,
  ): Promise<DeleteTeamResponseDto> {
    await this.teamsService.deleteTeam(teamId);
    return { message: 'Team deleted successfully' };
  }

  @Get('test')
  @ApiOperation({
    summary: 'Admin teams endpoints test',
    operationId: 'adminTeamsTest',
  })
  test() {
    return { message: 'Admin teams endpoints are working!' };
  }
}

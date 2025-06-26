import { ApiProperty } from '@nestjs/swagger';
import { TeamDto } from '../../teams/dto/teams-response.dto';

export class AdminUserDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User first name' })
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  lastName: string;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'Is user admin' })
  isAdmin: boolean;

  @ApiProperty({ description: 'Profile photo path', required: false })
  profilePhoto?: string;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;
}

export class GetAllUsersResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: [AdminUserDto], description: 'Users list' })
  users: AdminUserDto[];
}

export class MakeAdminResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: AdminUserDto, description: 'Updated user data' })
  user: AdminUserDto;
}

export class RemoveAdminResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: AdminUserDto, description: 'Updated user data' })
  user: AdminUserDto;
}

export class DeleteUserResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;
}

// Admin Teams Responses
export class CreateTeamResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: TeamDto, description: 'Created team data' })
  team: TeamDto;
}

export class GetAllTeamsResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: [TeamDto], description: 'Teams list' })
  teams: TeamDto[];
}

export class UpdateTeamAsAdminResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: TeamDto, description: 'Updated team data' })
  team: TeamDto;
}

export class DeleteTeamResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;
}
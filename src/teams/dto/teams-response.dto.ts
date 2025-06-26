import { ApiProperty } from '@nestjs/swagger';
import { CreditPeriod } from '@prisma/client';

export class TeamDto {
  @ApiProperty({ description: 'Team ID' })
  id: string;

  @ApiProperty({ description: 'Team name' })
  name: string;

  @ApiProperty({ description: 'Team photo path', required: false })
  photo?: string;

  @ApiProperty({ description: 'Team photo URL', required: false })
  photoUrl?: string;

  @ApiProperty({ description: 'Team leader ID' })
  leadID: string;

  @ApiProperty({ description: 'Total team credits' })
  totalCredits: number;

  @ApiProperty({ description: 'Team creation date' })
  createdAt: Date;
}

export class TeamMemberDto {
  @ApiProperty({ description: 'Member ID' })
  id: string;

  @ApiProperty({ description: 'Team ID' })
  teamID: string;

  @ApiProperty({ description: 'User ID' })
  userID: string;

  @ApiProperty({ description: 'Maximum credit limit for user' })
  maxCredit: number;

  @ApiProperty({ description: 'Credit period type', enum: CreditPeriod })
  creditPeriod: CreditPeriod;

  @ApiProperty({ description: 'Member creation date' })
  createdAt: Date;
}

export class UpdateTeamResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: TeamDto, description: 'Updated team data' })
  team: TeamDto;
}

export class AddMemberResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: TeamMemberDto, description: 'Added member data' })
  member: TeamMemberDto;
}

export class RemoveMemberResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;
}

export class UpdateMemberResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: TeamMemberDto, description: 'Updated member data' })
  member: TeamMemberDto;
}

export class GetTeamMembersResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: [TeamMemberDto], description: 'Team members list' })
  members: TeamMemberDto[];
}

export class GetMyTeamsResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: [TeamDto], description: 'User teams list' })
  teams: TeamDto[];
}
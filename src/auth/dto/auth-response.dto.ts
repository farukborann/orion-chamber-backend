import { ApiProperty } from '@nestjs/swagger';

export class UserDataDto {
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
}

export class LoginResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: UserDataDto, description: 'User data' })
  user: UserDataDto;
}

export class RegisterResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: UserDataDto, description: 'User data' })
  user: UserDataDto;
}

export class LogoutResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;
}

export class UserTeamInfoDto {
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

  @ApiProperty({ description: 'User max credit limit in this team' })
  maxCredit: number;

  @ApiProperty({
    description: 'User credit period',
    enum: ['WEEKLY', 'MONTHLY'],
  })
  creditPeriod: string;

  @ApiProperty({ description: 'Is user the leader of this team' })
  isLeader: boolean;
}

export class MeResponseDto {
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

  @ApiProperty({
    type: [UserTeamInfoDto],
    description: 'Teams user is member of',
  })
  teams: UserTeamInfoDto[];
}
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
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

  @ApiProperty({ description: 'Profile photo URL', required: false })
  profilePhotoUrl?: string;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;
}

export class UpdateProfileResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: UserProfileDto, description: 'Updated user data' })
  user: UserProfileDto;
}
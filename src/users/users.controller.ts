import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  UpdateProfileDto,
  UserProfileDto,
  UpdateProfileResponseDto,
} from './dto';
import { UsersService } from './users.service';
import { User, SessionUser } from '../core/decorators/user.decorator';
import { AuthGuard } from '../core/guards/auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@User() user: SessionUser): Promise<UserProfileDto> {
    const userProfile = await this.usersService.getProfile(
      user.userId.toString(),
    );

    return {
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      isAdmin: userProfile.isAdmin,
      profilePhoto: userProfile.profilePhoto,
      profilePhotoUrl: this.usersService.getProfilePhotoUrl(
        userProfile.profilePhoto,
      ),
      createdAt: userProfile.createdAt,
    };
  }

  @Put('profile')
  async updateProfile(
    @User() user: SessionUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<UpdateProfileResponseDto> {
    const updatedUser = await this.usersService.updateProfile(
      user.userId.toString(),
      updateProfileDto,
    );

    return {
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        profilePhoto: updatedUser.profilePhoto,
        profilePhotoUrl: this.usersService.getProfilePhotoUrl(
          updatedUser.profilePhoto,
        ),
        createdAt: updatedUser.createdAt,
      },
    };
  }

  @Get('test')
  @ApiOperation({ operationId: 'usersTest' })
  test() {
    return { message: 'Users endpoints are working!' };
  }
}
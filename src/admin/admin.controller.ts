import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  MakeAdminDto,
  GetAllUsersResponseDto,
  MakeAdminResponseDto,
  RemoveAdminResponseDto,
  DeleteUserResponseDto,
} from './dto';
import { AdminGuard } from '../core/guards/admin.guard';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getAllUsers(): Promise<GetAllUsersResponseDto> {
    const users = await this.adminService.getAllUsers();
    return {
      message: 'Users retrieved successfully',
      users: users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
      })),
    };
  }

  @Post('make-admin')
  async makeUserAdmin(
    @Body() makeAdminDto: MakeAdminDto,
  ): Promise<MakeAdminResponseDto> {
    const user = await this.adminService.makeUserAdmin(makeAdminDto);
    return {
      message: 'User promoted to admin successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
      },
    };
  }

  @Post('remove-admin')
  async removeAdminRole(
    @Body() makeAdminDto: MakeAdminDto,
  ): Promise<RemoveAdminResponseDto> {
    const user = await this.adminService.removeAdminRole(makeAdminDto);
    return {
      message: 'Admin role removed successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
      },
    };
  }

  @Delete('users/:email')
  async deleteUser(
    @Param('email') email: string,
  ): Promise<DeleteUserResponseDto> {
    await this.adminService.deleteUser(email);
    return {
      message: 'User deleted successfully',
    };
  }

  @Get('test')
  @ApiOperation({ operationId: 'adminTest' })
  test() {
    return { message: 'Admin endpoints are working!' };
  }
}

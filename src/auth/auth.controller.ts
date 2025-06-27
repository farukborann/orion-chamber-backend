import {
  Controller,
  Post,
  Get,
  Body,
  Session,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  LoginResponseDto,
  RegisterResponseDto,
  LogoutResponseDto,
  MeResponseDto,
} from './dto';
import { User, SessionUser } from '../core/decorators/user.decorator';
import { AuthGuard } from '../core/guards/auth.guard';
import { TeamsService } from '../teams/teams.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly teamsService: TeamsService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: any,
  ): Promise<LoginResponseDto> {
    const user = await this.authService.login(loginDto);

    session.userId = user.id;
    session.isAdmin = user.isAdmin;

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    const user = await this.authService.register(registerDto);

    return {
      message: 'Registration successful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async logout(@Session() session: any): Promise<LogoutResponseDto> {
    session.destroy();
    return { message: 'Logout successful' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@User() user: SessionUser): Promise<MeResponseDto> {
    const userProfile = await this.authService.findById(user.userId.toString());

    if (!userProfile) {
      throw new Error('User not found');
    }

    // Format teams data
    const teams =
      userProfile.teamMemberships
        ?.filter(
          (membership) =>
            membership.deletedAt === null &&
            membership.team?.deletedAt === null,
        )
        .map((membership) => ({
          id: membership.team.id,
          name: membership.team.name,
          photo: membership.team.photo,
          photoUrl: this.teamsService.getTeamPhotoUrl(membership.team.photo),
          leadID: membership.team.leadID,
          totalCredits: membership.team.totalCredits,
          maxCredit: membership.maxCredit,
          creditPeriod: membership.creditPeriod,
          isLeader: membership.team.leadID === userProfile.id,
        })) || [];

    return {
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      isAdmin: userProfile.isAdmin,
      profilePhoto: userProfile.profilePhoto,
      teams,
    };
  }
}
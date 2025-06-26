import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  CreateVtonProcessDto,
  VtonProcessResponseDto,
  GarmentTypeDetectionDto,
  GarmentTypeResponseDto,
} from './dto';
import { VtonService } from './vton.service';
import { User } from '../core/decorators';
import { AuthGuard } from '../core/guards';
import { AiService } from '../core/services';

@ApiTags('vton')
@Controller('vton')
@UseGuards(AuthGuard)
export class VtonController {
  constructor(
    private readonly vtonService: VtonService,
    private readonly aiService: AiService,
  ) {}

  /**
   * Detect garment type from base64 image (Frontend use)
   */
  @Post('detect-garment-type')
  async detectGarmentType(
    @Body() garmentTypeDetectionDto: GarmentTypeDetectionDto,
  ): Promise<GarmentTypeResponseDto> {
    const garmentType = await this.aiService.getGarmentType(
      garmentTypeDetectionDto.garment,
    );
    return { garmentType };
  }

  /**
   * Create a new VTON process
   */
  @Post('create')
  async createVtonProcess(
    @User() user: { userId: string; teamID: string },
    @Body() createVtonProcessDto: CreateVtonProcessDto,
  ): Promise<VtonProcessResponseDto> {
    return this.vtonService.createVtonProcess(
      user.userId,
      user.teamID,
      createVtonProcessDto,
    );
  }

  /**
   * Get VTON process status by ID
   */
  @Get('status/:id')
  async getVtonProcessStatus(
    @User() user: { userId: string },
    @Param('id') processId: string,
  ): Promise<VtonProcessResponseDto> {
    return this.vtonService.getVtonProcessStatus(processId, user.userId);
  }

  /**
   * Get user's VTON processes
   */
  @Get('processes')
  async getUserVtonProcesses(
    @User() user: { userId: string },
    @Query('teamId') teamId?: string,
  ): Promise<VtonProcessResponseDto[]> {
    return this.vtonService.getUserVtonProcesses(user.userId, teamId);
  }
}
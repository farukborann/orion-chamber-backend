import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import {
  Process,
  VtonMannequin,
  ProcessStatus,
  ProcessType,
  ProcessVisibility,
} from '@prisma/client';
import { CreateVtonProcessDto, VtonProcessResponseDto } from './dto';
import { VtonInput, VtonOutput } from './types';
import { AiService, CreditService, PrismaService } from '../core/services';
import { FileCategory } from '../storage/dto';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class VtonService {
  private readonly vtonCredit = 4; // VTON process costs 4 credits

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly creditService: CreditService,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Create a new VTON process
   */
  async createVtonProcess(
    userID: string,
    teamID: string,
    createVtonProcessDto: CreateVtonProcessDto,
  ): Promise<VtonProcessResponseDto> {
    // Check credit availability
    const creditCheck = await this.creditService.checkCreditAvailability(
      userID,
      teamID,
      this.vtonCredit,
    );

    if (!creditCheck.hasCredit) {
      throw new ForbiddenException(creditCheck.message);
    }

    // Validate mannequin (either string ID for predefined or base64 for uploaded)
    let mannequinPath: string;
    if (this.isValidObjectId(createVtonProcessDto.mannequin)) {
      // It's a predefined mannequin ID
      const mannequin = await this.prisma.vtonMannequin.findFirst({
        where: {
          id: createVtonProcessDto.mannequin as string,
          deletedAt: null, // Soft delete check
        },
      });
      if (!mannequin) {
        throw new NotFoundException('Mannequin not found');
      }
      mannequinPath = mannequin.mainImage;
    } else {
      // Assume it's a base64 uploaded image, save it
      const uploadResult = await this.storageService.uploadFile({
        fileData: createVtonProcessDto.mannequin as string,
        category: FileCategory.MANNEQUIN,
        fileName: 'mannequin.jpg',
      });
      mannequinPath = uploadResult.filePath;
    }

    // Save garment image
    const garmentUploadResult = await this.storageService.uploadFile({
      fileData: createVtonProcessDto.garment,
      category: FileCategory.GARMENT,
      fileName: 'garment.jpg',
    });
    const garmentPath = garmentUploadResult.filePath;

    // Garment type must be provided by frontend
    const garmentType = createVtonProcessDto.garmentType;
    if (!garmentType) {
      throw new BadRequestException(
        'Garment type is required. Use the garment type detection endpoint first.',
      );
    }

    // Save manual mask if provided
    let manuelMaskPath: string | undefined;
    if (createVtonProcessDto.manuelMask) {
      const maskUploadResult = await this.storageService.uploadFile({
        fileData: createVtonProcessDto.manuelMask,
        category: FileCategory.MASK,
        fileName: 'mask.jpg',
      });
      manuelMaskPath = maskUploadResult.filePath;
    }

    // Create VTON input
    const vtonInput: VtonInput = {
      mannequin: mannequinPath,
      garment: garmentPath,
      garmentType,
      nSteps: createVtonProcessDto.nSteps,
      manuelMask: manuelMaskPath,
    };

    // Create process
    const process = await this.prisma.process.create({
      data: {
        userID,
        teamID,
        type: ProcessType.VTON,
        inputs: vtonInput,
        status: ProcessStatus.PENDING,
        visibility:
          createVtonProcessDto.visibility === 'team'
            ? ProcessVisibility.TEAM
            : ProcessVisibility.ME,
        credit: this.vtonCredit,
        deletedAt: null, // Initialize deletedAt for soft delete
      },
    });

    return this.mapToResponseDto(process);
  }

  /**
   * Get VTON process status by ID
   */
  async getVtonProcessStatus(
    processId: string,
    userID: string,
  ): Promise<VtonProcessResponseDto> {
    if (!this.isValidObjectId(processId)) {
      throw new BadRequestException('Invalid process ID');
    }

    const process = await this.prisma.process.findFirst({
      where: {
        id: processId,
        type: ProcessType.VTON,
        deletedAt: null, // Soft delete check
      },
    });

    if (!process) {
      throw new NotFoundException('VTON process not found');
    }

    // Check access permission
    if (
      process.userID !== userID &&
      process.visibility === ProcessVisibility.ME
    ) {
      throw new ForbiddenException('Access denied to this process');
    }

    return this.mapToResponseDto(process);
  }

  /**
   * Get user's VTON processes
   */
  async getUserVtonProcesses(
    userID: string,
    teamID?: string,
  ): Promise<VtonProcessResponseDto[]> {
    const whereCondition: any = {
      type: ProcessType.VTON,
      deletedAt: null, // Soft delete check
    };

    // If teamID provided, get team processes, otherwise get user's own processes
    if (teamID) {
      whereCondition.teamID = teamID;
      whereCondition.OR = [{ userID }, { visibility: ProcessVisibility.TEAM }];
    } else {
      whereCondition.userID = userID;
    }

    const processes = await this.prisma.process.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
    });

    return processes.map((process) => this.mapToResponseDto(process));
  }

  /**
   * Map process entity to response DTO
   */
  private mapToResponseDto(process: Process): VtonProcessResponseDto {
    const vtonInput = process.inputs as unknown as VtonInput;

    const response: VtonProcessResponseDto = {
      id: process.id,
      userID: process.userID,
      teamID: process.teamID,
      type: process.type,
      status: process.status as any,
      visibility: process.visibility as any,
      credit: process.credit,
      createdAt: process.createdAt,
      vtonInput,
    };

    // Add output if process is completed
    if (process.outputs && process.status === ProcessStatus.COMPLETED) {
      const vtonOutput = process.outputs as unknown as VtonOutput;
      response.vtonOutput = vtonOutput;
    }

    return response;
  }

  /**
   * Check if value is a valid ObjectId string format
   */
  private isValidObjectId(value: string): boolean {
    // Simple ObjectId validation - 24 character hex string
    return (
      typeof value === 'string' &&
      value.length === 24 &&
      /^[0-9a-fA-F]{24}$/.test(value)
    );
  }
}
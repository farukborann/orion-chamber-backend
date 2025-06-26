import { ApiProperty } from '@nestjs/swagger';
import { ProcessStatus, ProcessVisibility, ProcessType } from '@prisma/client';
import { VtonInput, VtonOutput } from '../types';

export class VtonProcessResponseDto {
  @ApiProperty({ description: 'Process ID' })
  id: string;

  @ApiProperty({ description: 'User ID who created the process' })
  userID: string;

  @ApiProperty({ description: 'Team ID' })
  teamID: string;

  @ApiProperty({ description: 'Process type', enum: ProcessType })
  type: ProcessType;

  @ApiProperty({
    description: 'Current process status',
    enum: ProcessStatus,
    example: ProcessStatus.PENDING,
  })
  status: ProcessStatus;

  @ApiProperty({
    description: 'Process visibility',
    enum: ProcessVisibility,
    example: ProcessVisibility.ME,
  })
  visibility: ProcessVisibility;

  @ApiProperty({
    description: 'Credits consumed by this process',
    example: 4,
  })
  credit: number;

  @ApiProperty({ description: 'Process creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'VTON input parameters' })
  vtonInput: VtonInput;

  @ApiProperty({
    description: 'VTON output (only when completed)',
    required: false,
  })
  vtonOutput?: VtonOutput;
}
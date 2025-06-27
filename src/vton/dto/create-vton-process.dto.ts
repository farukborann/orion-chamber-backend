import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsMannequinField, IsMongoID } from '../../core/decorators';
import { GarmentType } from '../types';

export class CreateVtonProcessDto {
  @ApiProperty({
    description: 'Team ID (ObjectId)',
    example: '60f1234567890abcdef12345',
  })
  @IsMongoID()
  teamId: string;

  @ApiProperty({
    description: 'Mannequin ID (ObjectId) or base64 uploaded image',
    example: '60f1234567890abcdef12345',
  })
  @IsMannequinField()
  mannequin: string; // Mannequin ID or base64 uploaded image

  @ApiProperty({
    description: 'Base64 encoded garment image',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
  })
  @IsString()
  garment: string; // base64 garment image

  @ApiProperty({
    description:
      'Type of garment (must be detected first using detect-garment-type endpoint)',
    enum: GarmentType,
    example: GarmentType.TOP,
  })
  @IsEnum(GarmentType)
  garmentType: GarmentType; // Must be provided by frontend (use garment type detection endpoint first)

  @ApiProperty({
    description:
      'Number of processing steps (affects quality and processing time)',
    minimum: 1,
    maximum: 50,
    example: 20,
  })
  @IsNumber()
  @Min(1)
  @Max(50)
  nSteps: number;

  @ApiProperty({
    description: 'Optional manual mask as base64 image',
    required: false,
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
  })
  @IsOptional()
  @IsString()
  manuelMask?: string; // base64 manual mask

  @ApiProperty({
    description:
      'Process visibility (me = only user, team = team members can see)',
    enum: ['me', 'team'],
    required: false,
    example: 'me',
  })
  @IsOptional()
  @IsEnum(['me', 'team'])
  visibility?: 'me' | 'team';
}

import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GarmentTypeDetectionDto {
  @ApiProperty({
    description: 'Base64 encoded garment image',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
  })
  @IsString()
  garment: string; // base64 garment image
}

export class GarmentTypeResponseDto {
  @ApiProperty({
    description: 'Detected garment type',
    example: 'TOP',
    enum: ['TOP', 'BOTTOM'],
  })
  garmentType: string; // Detected garment type
}
import { ApiProperty } from '@nestjs/swagger';
import { FileCategory } from './file-upload.dto';

export class FileInfoDto {
  @ApiProperty({ description: 'File path' })
  path: string;

  @ApiProperty({ description: 'Generated file name' })
  fileName: string;

  @ApiProperty({ description: 'Original file name' })
  originalName: string;

  @ApiProperty({ description: 'File category', enum: FileCategory })
  category: FileCategory;

  @ApiProperty({ description: 'File size in bytes' })
  size: number;

  @ApiProperty({ description: 'File access URL' })
  url: string;
}

export class FileUploadResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ type: FileInfoDto, description: 'Uploaded file information' })
  file: FileInfoDto;
}
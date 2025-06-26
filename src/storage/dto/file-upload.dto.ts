import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum FileCategory {
  PROFILE = 'profiles',
  GARMENT = 'garments',
  MANNEQUIN = 'mannequins',
  RESULT = 'results',
  MASK = 'masks',
}

export class FileUploadDto {
  @IsString()
  @IsNotEmpty()
  fileData: string; // base64 encoded file

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsEnum(FileCategory)
  category: FileCategory;

  @IsString()
  @IsOptional()
  mimeType?: string;
}

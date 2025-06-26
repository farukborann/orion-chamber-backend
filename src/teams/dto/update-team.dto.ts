import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  photo?: string; // base64 encoded image

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalCredits?: number;
}

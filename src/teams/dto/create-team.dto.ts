import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { IsMongoID } from '../../core/decorators';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  photo?: string; // base64 encoded image

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalCredits?: number;

  @IsMongoID()
  leaderId: string; // User ID who will be the team leader
}

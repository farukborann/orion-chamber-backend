import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { CreditPeriod } from '@prisma/client';

export class AddMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxCredit?: number;

  @IsEnum(CreditPeriod)
  @IsOptional()
  creditPeriod?: CreditPeriod;
}
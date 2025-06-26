import { IsNumber, Min, IsEnum, IsOptional } from 'class-validator';

import { CreditPeriod } from '@prisma/client';

export class UpdateMemberDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxCredit?: number;

  @IsEnum(CreditPeriod)
  @IsOptional()
  creditPeriod?: CreditPeriod;
}
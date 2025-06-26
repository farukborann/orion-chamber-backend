import { IsEmail, IsNotEmpty } from 'class-validator';

export class MakeAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

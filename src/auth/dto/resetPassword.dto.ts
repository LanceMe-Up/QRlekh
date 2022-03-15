import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class InitiateResetPasswordDto {
  @IsEmail()
  readonly email: string;
}

export class FinalizeResetPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  readonly code: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleDto } from './role.dto';

export class UserEntityDto {
  @IsString()
  @Expose()
  @ApiProperty({
    example: 'kishor',
    description: 'should be enter full name',
  })
  readonly username: string;

  @IsEmail()
  @Expose()
  @ApiProperty({
    example: 'kishorkc120@gmail.com',
    description: 'should be enter email',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  @Length(6, 30, { message: 'password has to be at between 6 and 30 chars' })
  readonly password: string;

  @IsOptional()
  @IsEnum(RoleDto)
  @Exclude()
  @ApiProperty({ default: RoleDto.USER })
  readonly role: RoleDto.USER;

  constructor(partial: Partial<UserEntityDto>) {
    Object.assign(this, partial);
  }
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RoleDto } from './role.dto';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'kishor',
    description: 'should be enter full name',
  })
  readonly username: string;

  @IsEmail()
  @ApiProperty({
    example: 'kishorkc120@gmail.com',
    description: 'should be enter email',
  })
  readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'meropa125ABC',
    description: 'should be enter password',
    minLength: 8,
  })
  readonly password: string;

  @IsOptional()
  @IsEnum(RoleDto)
  @ApiProperty({ default: RoleDto.USER })
  readonly role: RoleDto.USER;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

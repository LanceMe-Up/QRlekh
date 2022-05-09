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
    example: 'nirajan',
    description: 'should be enter full name',
  })
  readonly username: string;

  @IsEmail()
  @ApiProperty({
    example: 'nirajankc360@gmail.com',
    description: 'should be enter email',
  })
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '9865000000',
    description: 'should be enter phone number',
    minLength: 10,
  })
  readonly phone: string;

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

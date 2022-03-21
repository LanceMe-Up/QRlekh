import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'nirajankc360@gmail.com',
    description: 'should be enter email',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'meropa125ABC',
    description: 'should be enter password',
    minLength: 8,
  })
  password: string;
}

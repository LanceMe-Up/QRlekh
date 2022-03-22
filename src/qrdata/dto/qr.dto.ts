import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class QrDto {
  @IsString()
  @ApiProperty({ example: 'Temple', description: 'Name of Qrlekh Info' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'white', description: 'Choose Category' })
  category: string;

  @IsString()
  @ApiProperty({ example: 'Mai Temple', description: 'Known For' })
  knownFor: string;

  @IsString()
  @ApiProperty({
    example: 'Temple ',
    description: 'Give the short detail of Temple?',
  })
  desc: string;

  @IsString()
  @ApiProperty({
    example: 'kathamandu',
    description: 'What is the location of Temple?',
  })
  location: string;

  @IsEmpty()
  @ApiProperty({ minLength: 1, maxLength: 5, default: 1 })
  rating: number;

  @IsEmpty()
  @ApiProperty({ default: false })
  favourite: boolean;

  @IsEmpty()
  @ApiProperty({ default: false })
  like: boolean;

  @IsEmpty()
  @ApiProperty({ default: false })
  dislike: boolean;

  @IsEmpty()
  user: any;

  @IsOptional()
  tagNameId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TagDto {
  @ApiProperty({ example: 'Temple', description: 'Tag For' })
  @IsString()
  tagName: string;

  @ApiProperty({ example: '12.058755', description: 'latitude number' })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: '26.058755', description: 'longitude number' })
  @IsNumber()
  long: number;
}

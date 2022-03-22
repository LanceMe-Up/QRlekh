import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsString } from 'class-validator';

export class TagDto {
  @ApiProperty({ example: 'Temple', description: 'Tag For' })
  @IsString()
  tagName: string;

  @ApiProperty({ example: '12.058755', description: 'latitude number' })
  @IsDecimal()
  lat: number;

  @ApiProperty({ example: '26.058755', description: 'longitude number' })
  @IsDecimal()
  long: number;
}

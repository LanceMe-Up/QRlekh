import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class TagDto {
  @ApiProperty({
    example: ['one', 'two'],
    description: 'should be tag with a array string',
    type: [String],
  })
  @IsArray()
  tagName: string[];

  @IsNumber()
  @IsOptional()
  subtagId: number;

  @IsNumber()
  @IsOptional()
  qrlekhId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({
    example: ['one', 'two'],
    description: 'should be tag with a array string',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  tagName: string[];

  @IsNumber()
  @IsOptional()
  subtagId: number;

  @IsNumber()
  @IsOptional()
  qrlekhId: number;
}

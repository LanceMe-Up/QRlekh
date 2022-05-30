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
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'should be subtagId',
  })
  subtagId: number;

  @IsNumber()
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'should be qrlekhId',
  })
  qrlekhId: number;
}

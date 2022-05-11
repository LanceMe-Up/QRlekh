import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class TagQrDto {
  @ApiProperty({
    example: ['one', 'two'],
    description: 'should be tag with a array string',
    type: [String],
  })
  @IsArray()
  tagName: string[];

  @IsNumber()
  qrlekhId: number;
}

export class TagSubQrDto {
  @ApiProperty({
    example: ['one', 'two'],
    description: 'should be tag with a array string',
    type: [String],
  })
  @IsArray()
  tagName: string[];

  @IsNumber()
  subtagId: number;
}

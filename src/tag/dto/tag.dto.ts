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
  @ApiProperty({
    example: 1,
    description: 'should be qrlekhId',
  })
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
  @ApiProperty({
    example: 1,
    description: 'should be subtagId',
  })
  subtagId: number;
}

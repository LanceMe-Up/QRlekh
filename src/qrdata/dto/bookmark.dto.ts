import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class CreateQrBookmarkDto {
  @Type(() => Date)
  @IsDate({
    message:
      'expiryDate should be expiry date which is in ISO format i.e 2022-03-30T07:02:33.237Z',
  })
  @ApiProperty({
    example: '2022-03-30T07:02:33.237Z',
    description: 'should be use for the expiry date - ISO format',
  })
  expiryDate: Date;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'should be parent Qrlekh Id',
  })
  qrlekhId: number;
}

export class CreateSubQrBookmarkDto {
  @Type(() => Date)
  @IsDate({
    message:
      'expiryDate should be expiry date which is in ISO format i.e 2022-03-30T07:02:33.237Z',
  })
  @ApiProperty({
    example: '2022-03-30T07:02:33.237Z',
    description: 'should be use for the expiry date - ISO format',
  })
  expiryDate: Date;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'should be sub Qrlekh Id',
  })
  subQrlekhId: number;
}

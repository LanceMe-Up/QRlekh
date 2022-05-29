import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class CreateQrBookmarkDto {
  // @Type(() => Date)
  // @IsDate({
  //   message:
  //     'expiryDate should be expiry date which is in ISO format i.e 2022-03-30T07:02:33.237Z',
  // })
  // @ApiProperty({
  //   example: '2022-03-30T07:02:33.237Z',
  //   description: 'should be use for the expiry date - ISO format',
  // })
  // expiryDate: Date;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'should be parent Qrlekh Id',
  })
  qrlekhId: number;
}

export class CreateSubQrBookmarkDto {
  // @Type(() => Date)
  // @IsDate({
  //   message:
  //     'expiryDate should be expiry date which is in ISO format i.e 2022-03-30T07:02:33.237Z',
  // })
  // @ApiProperty({
  //   example: '2022-03-30T07:02:33.237Z',
  //   description: 'should be use for the expiry date - ISO format',
  // })
  // expiryDate: Date;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'should be sub Qrlekh Id',
  })
  subQrlekhId: number;
}

export class UpdateQrBookmarkDto {
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'should be boolean i.e false or true',
  })
  isBookmark: boolean;
}

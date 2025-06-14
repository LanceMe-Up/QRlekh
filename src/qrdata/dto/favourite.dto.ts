import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class CreateQrFavouriteDto {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'should be parent Qrlekh Id',
  })
  qrlekhId: number;
}

export class UpdateQrFavouriteDto {
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'should be use for the favourite i.e true or false',
  })
  favourite: boolean;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'should be parent Qrlekh Id',
  })
  qrlekhId: number;
}

export class CreateSubQrFavouriteDto {
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'should be use for the favourite i.e true or false',
  })
  favourite: boolean;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'should be sub Qr favourite Id',
  })
  subQrfavId: number;
}

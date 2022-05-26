import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateQrFavouriteDto {
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

export class UpdateQrFavouriteDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    description: 'should be use for the favourite i.e true or false',
  })
  favourite: boolean;
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

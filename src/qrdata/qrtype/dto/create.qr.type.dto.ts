import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateQrTypeDto {
  @IsString()
  @ApiProperty({
    example: 'public',
    description: 'should be type',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: 'in which qr lekh id',
  })
  @IsInt()
  qrlekhId: number;
}

export class CreateSubQrTypeDto {
  @IsString()
  @ApiProperty({
    example: 'public',
    description: 'should be sub type',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: 'in which sub Qr lekh Id',
  })
  @IsInt()
  subQrlekhId: number;
}

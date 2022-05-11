import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateGalleryQrlekhDto {
  @IsOptional()
  @ApiProperty()
  gallery: string[];

  @ApiProperty({
    example: 1,
    description: 'in which parent - qrlekh id',
  })
  @IsNumber()
  qrlekhId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateGallerySubQrlekhDto {
  @IsOptional()
  @ApiProperty()
  gallery: string[];

  @ApiProperty({
    example: 1,
    description: 'in which child - qrlekh id',
  })
  @IsInt()
  subQrImageId: number;
}

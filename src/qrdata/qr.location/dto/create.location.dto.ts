import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQrLocationDto {
  @ApiProperty({
    example: 'kathmandu',
    description: 'should be name',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  long: number;

  @ApiProperty()
  @IsNumber()
  qrlekhId: number;
}

export class GetLocationDto {
  @ApiProperty()
  @IsOptional()
  ip_address?: string;

  @ApiProperty()
  @IsOptional()
  radius: number;

  @ApiProperty()
  @IsBooleanString()
  is_metric: boolean;

  @ApiProperty()
  @IsNotEmpty()
  long: number;

  @ApiProperty()
  @IsNotEmpty()
  lat: number;
}

export class CreateSubQrLocationDto {
  @ApiProperty({
    example: 'kathmandu',
    description: 'should be name',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  long: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  subqrId: number;
}

export class UpdateSubQrLocationDto extends PartialType(
  CreateSubQrLocationDto,
) {}

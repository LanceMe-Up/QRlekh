import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsDecimal,
  IsLatitude,
  IsLongitude,
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
  @IsDecimal()
  lat: number;

  @ApiProperty()
  @IsDecimal()
  long: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
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
  @IsLongitude()
  long: number;

  @ApiProperty()
  @IsLatitude()
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
  @IsLatitude()
  lat: number;

  @ApiProperty()
  @IsLongitude()
  long: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  subqrId: number;
}

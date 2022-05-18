import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQrLocationDto {
  @ApiProperty({
    example: 'kathmandu',
    description: 'should be name',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  long: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  qrlekhId: number;
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
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  long: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  subqrId: number;
}

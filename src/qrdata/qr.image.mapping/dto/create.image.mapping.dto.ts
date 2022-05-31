import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQrImageMappingDto {
  @IsString()
  @ApiProperty({ example: 'abc', description: 'should be title' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'abc is abc', description: 'should be desc' })
  desc: string;

  @IsString()
  @ApiProperty({ example: 'abc', description: 'should be shape' })
  shape: string;

  @IsArray()
  @ApiProperty({ example: [1, 2, 3], description: 'should be coords' })
  coords: number[];

  @IsString()
  @ApiProperty({ example: 'abc is abc', description: 'should be preFillColor' })
  preFillColor: string;

  @IsString()
  @ApiProperty({ example: 'abc is abc', description: 'should be fillColor' })
  fillColor: string;

  @IsString()
  @ApiProperty({ example: 'abc is abc', description: 'should be preFillColor' })
  strokeColor: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'should be qrMappingId',
  })
  qrMappingId: number;
}

export class UpdateQrImageMappingDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'abc', description: 'should be title' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'abc is abc', description: 'should be desc' })
  desc: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'abc', description: 'should be shape' })
  shape: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: [1, 2, 3], description: 'should be coords' })
  coords: number[];

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'abc is abc', description: 'should be preFillColor' })
  preFillColor: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'abc is abc', description: 'should be fillColor' })
  fillColor: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'abc is abc', description: 'should be preFillColor' })
  strokeColor: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'should be qrMappingId',
  })
  @IsOptional()
  qrMappingId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateQrReviewsDto {
  @IsString()
  @ApiProperty({
    example:
      'Very nice and peaceful environment. Welcome with fresh juice and warm hand towels. Friendly staff and manager.',
    description: 'the review like..',
  })
  desc: string;

  @IsBoolean()
  @ApiProperty({
    default: false,
    description: 'boolean',
  })
  @IsOptional()
  israting: false;

  @ApiProperty({
    default: 4,
    description: '1-5',
  })
  @Max(5)
  @Min(1)
  @IsInt()
  rating: number;

  @ApiProperty({
    example: 1,
    description: 'in which qrlekh id should we write for review',
  })
  @IsInt()
  qrlekhId: number;

  @ApiProperty({
    example: 1,
    description: 'in which user should write for review',
  })
  @IsInt()
  @IsOptional()
  userId: number;
}

export class CreateSubQrReviewsDto {
  @IsString()
  @ApiProperty({
    example:
      'Very nice and peaceful environment. Welcome with fresh juice and warm hand towels. Friendly staff and manager.',
    description: 'the review like..',
  })
  desc: string;

  @IsBoolean()
  @ApiProperty({
    default: false,
    description: 'boolean',
  })
  @IsOptional()
  israting: false;

  @ApiProperty({
    default: 4,
    description: '1 - 5',
  })
  @Max(5)
  @Min(1)
  @IsInt()
  rating: number;

  @ApiProperty({
    example: 1,
    description: 'in which sub qrlekh id should we write for review',
  })
  @IsInt()
  subQrlekhDataId: number;

  @ApiProperty({
    example: 1,
    description: 'in which user should write for review',
  })
  @IsInt()
  @IsOptional()
  userId: number;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({
    example: 'temple',
    description: 'should be use for the name of category',
  })
  name: string;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  userId: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

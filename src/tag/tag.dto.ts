import { IsNumber, IsString } from 'class-validator';

export class TagDto {
  @IsString()
  tagName: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  long: number;
}

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  NotFoundException,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { Roles } from '../roles.decorates';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update.tag.dto';
import { TagService } from './tag.service';

@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: TagDto) {
    return this.tagService.createTag(dto, dto.subtagId, dto.qrlekhId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Body() dto: UpdateTagDto, @Param('id') id: string) {
    return this.tagService.updateTag(
      dto,
      { id: +id },
      dto.subtagId,
      dto.qrlekhId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const data = await this.tagService.getTag();

    if (!data) throw new NotFoundException("Tag doesn't exists!");
    return data;
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Get(':id')
  //   async getById(@Param('id') id: string) {
  //     return this.tagService.getTagId({ id: +id });
  //   }

  //   @Get('location/data/:lat/:long')
  //   async calculateDataahah(
  //     @Param('lat') lat: string,
  //     @Param('long') long: string,
  //   ) {
  //     return this.tagService.distanceDB(+lat, +long);
  //   }

  // @UseGuards(JwtAuthGuard)
  // @Get(':lat/:long')
  // async getByTagLat(@Param('lat') lat: string, @Param('long') long: string) {
  //   return this.tagService.getTaging(+lat, +long);
  // }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(UserRole.ADMIN)
  //   @Delete(':id')
  //   async deleteData(@Param('id') id: number) {
  //     return await this.tagService.deleteTag(id);
  //   }
}

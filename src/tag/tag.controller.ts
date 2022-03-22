import {
  Body,
  Controller,
  Request,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { Roles } from '../roles.decorates';
import { TagDto } from './tag.dto';
import { TagService } from './tag.service';

@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: TagDto, @Request() req) {
    return this.tagService.createTag(dto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.tagService.getTag();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.tagService.getTagId({ id: +id });
  }

  @Get('location/data/:lat/:long')
  async calculateDataahah(
    @Param('lat') lat: string,
    @Param('long') long: string,
  ) {
    return this.tagService.distanceDB(+lat, +long);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':lat/:long')
  async getByTagLat(@Param('lat') lat: string, @Param('long') long: string) {
    return this.tagService.getTaging(+lat, +long);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteData(@Param('id') id: number) {
    return await this.tagService.deleteTag(id);
  }
}

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
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { Roles } from '../roles.decorates';
import { TagQrDto, TagSubQrDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update.tag.dto';
import { TagService } from './tag.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get()
  async getAll() {
    const data = await this.tagService.getTag();

    if (!data) throw new NotFoundException("Tag doesn't exists!");
    return data;
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post('/qr')
  async createQr(@Body() dto: TagQrDto) {
    return this.tagService.createQrTag(dto, dto.qrlekhId);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post('/sub/qr')
  async createSubQr(@Body() dto: TagSubQrDto) {
    return this.tagService.createSubQrTag(dto, dto.subtagId);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Patch(':id')
  async update(@Body() dto: UpdateTagDto, @Param('id') id: string) {
    return this.tagService.updateTag(
      dto,
      { id: +id },
      dto.subtagId,
      dto.qrlekhId,
    );
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

import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Request,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { Roles } from '../roles.decorates';
import {
  CreateQrBookmarkDto,
  CreateSubQrBookmarkDto,
} from './dto/bookmark.dto';
import {
  CreateQrFavouriteDto,
  CreateSubQrFavouriteDto,
} from './dto/favourite.dto';
import { QrDto } from './dto/qr.dto';
import { QrdataService } from './qrdata.service';

@Controller('qrlekh')
@ApiTags('qrlekh')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrdataController {
  constructor(private readonly qrService: QrdataService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN || UserRole.SUPERADMIN)
  create(@Body() data: QrDto, @Request() req: any) {
    return this.qrService.createQr(data, req.user.id, data.categoryId);
  }

  @Get()
  async get() {
    return await this.qrService.get();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.qrService.getById({ id: Number(id) });
  }

  @Get('/:slug/data')
  getSlug(@Param('slug') slug: string) {
    return this.qrService.getBySlug(slug);
  }

  @Get('/bookmark')
  getBookmark() {
    return this.qrService.getBookmark();
  }

  @Get('/favourite')
  getFavourite() {
    return this.qrService.getFavourite();
  }

  @Patch('/:id/likes')
  countLike(@Param('id') id: string, @Request() req: any) {
    return this.qrService.getLike({ id: Number(id) }, req.user.id);
  }

  // remove a Like to a Post
  @Delete(':id/likes')
  removeLike(@Request() req: any, @Param('id') id: string) {
    return this.qrService.removeLike({ id: Number(id) }, req.user.id);
  }

  // like a sub child Like to a Post
  @Patch('/:id/sub-likes')
  countsubLike(@Param('id') id: string, @Request() req: any) {
    return this.qrService.getSubLike({ id: Number(id) }, req.user.id);
  }

  // remove a sub child Like to a Post
  @Delete('/:id/sub-likes/remove')
  @UseGuards(JwtAuthGuard)
  removesubLike(@Request() req: any, @Param('id') id: string) {
    return this.qrService.removeSubLike({ id: Number(id) }, req.user.id);
  }

  // @Delete(':id')
  // @UseGuards(RolesGuard)
  // @Roles(UserRole.ADMIN)
  // async deleteData(@Param('id') id: number) {
  //   return await this.qrService.deleteData(id);
  // }

  @Post('/bookmark/qr-lekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  createQrBookmark(@Body() data: CreateQrBookmarkDto, @Request() req: any) {
    return this.qrService.createQrBookmark(data, data.qrlekhId, req.user.id);
  }

  @Post('/bookmark/sub-qr-lekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  createSubQrBookmark(
    @Body() data: CreateSubQrBookmarkDto,
    @Request() req: any,
  ) {
    return this.qrService.createQrBookmark(data, data.subQrlekhId, req.user.id);
  }

  @Patch('/bookmark/:id/qr-lekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  updateQrBookmark(@Param('id') id: string, @Body() data: CreateQrBookmarkDto) {
    return this.qrService.updateQrBookmark(+id, data, data.qrlekhId);
  }

  @Post('/favourite')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  createQrFavourite(@Body() data: CreateQrFavouriteDto, @Request() req: any) {
    return this.qrService.createQrFavourite(data, data.qrlekhId, req.user.id);
  }

  @Post('/favourite/sub-module')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  createSubQrFavourite(
    @Body() data: CreateSubQrFavouriteDto,
    @Request() req: any,
  ) {
    return this.qrService.createQrFavourite(data, data.subQrfavId, req.user.id);
  }

  @Patch('/favourite/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  updateFavourite(@Param('id') id: string, @Body() data: CreateQrFavouriteDto) {
    return this.qrService.updateQrFavourite(+id, data, data.qrlekhId);
  }
}

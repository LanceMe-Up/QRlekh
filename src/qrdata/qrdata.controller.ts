import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Request,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { imageFileFilter, validateFileName } from '../photo-validate';
import { Roles } from '../roles.decorates';
import { CreateBookmarkDto } from './dto/bookmark.dto';
import { CreateQrFavouriteDto } from './dto/favourite.dto';
import { QrDto } from './dto/qr.dto';
import { SubQrDto } from './dto/sub.qr.dto';
// import { SubQrDto } from './dto/sub.qr.dto';

import { QrdataService } from './qrdata.service';

@Controller('qrlekh')
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

  @Get('/bookmark')
  getBookmark() {
    return this.qrService.getBookmark();
  }

  @Get('/favourite')
  getFavourite() {
    return this.qrService.getFavourite();
  }

  @Post('/sub-module')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN || UserRole.SUPERADMIN)
  createSub(@Body() data: SubQrDto, @Request() req: any) {
    return this.qrService.createSubQr(data, req.user.id, data.qrlekhDataId);
  }

  @Get('/sub-module')
  async getSub() {
    return await this.qrService.getSubQr();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.qrService.getById({ id: Number(id) });
  }

  @Get('/:slug/data')
  getSlug(@Param('slug') slug: string) {
    return this.qrService.getBySlug(slug);
  }

  @Patch('/:id/likes')
  countLike(@Param('id') id: string, @Request() req: any) {
    return this.qrService.getLike({ id: Number(id) }, req.user.id);
  }

  // remove a Like to a Post
  @Delete(':id/likes')
  @UseGuards(JwtAuthGuard)
  removeLike(@Request() req: any, @Param('id') id: string) {
    return this.qrService.removeLike({ id: Number(id) }, req.user.id);
  }

  // like a sub child Like to a Post
  @Patch('/:id/sub-likes')
  countsubLike(@Param('id') id: string, @Request() req: any) {
    return this.qrService.getSubLike({ id: Number(id) }, req.user.id);
  }

  // remove a sub child Like to a Post
  @Delete(':id/sub-likes')
  @UseGuards(JwtAuthGuard)
  removesubLike(@Request() req: any, @Param('id') id: string) {
    return this.qrService.removeSubLike({ id: Number(id) }, req.user.id);
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createQrImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('qrlekhDataId') qrlekhDataId: any,
  ) {
    const image = `${process.env.HOST}/static/upload/${file.filename}`;
    return this.qrService.setQrlekhImage(image, Number(qrlekhDataId), null);
  }

  @Patch('/update-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
    @Param('id') id: number,
  ) {
    const image = `${process.env.HOST}/static/upload/${file.filename}`;
    return await this.qrService.updateQrlekhImage(image, +id);
  }

  // @Delete(':id')
  // @UseGuards(RolesGuard)
  // @Roles(UserRole.ADMIN)
  // async deleteData(@Param('id') id: number) {
  //   return await this.qrService.deleteData(id);
  // }

  @Post('/bookmark')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  createBookmark(@Body() data: CreateBookmarkDto, @Request() req: any) {
    return this.qrService.createBookmark(
      data,
      data.subQrlekhId,
      data.qrlekhId,
      req.user.id,
    );
  }

  @Patch('/bookmark/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  updateBookmark(@Param('id') id: string, @Body() data: CreateBookmarkDto) {
    return this.qrService.updateBookmark(
      +id,
      data,
      data.subQrlekhId,
      data.qrlekhId,
    );
  }

  @Post('/favourite')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  createFavourite(@Body() data: CreateQrFavouriteDto, @Request() req: any) {
    return this.qrService.createFavourite(
      data,
      data.subQrfavId,
      data.qrlekhId,
      req.user.id,
    );
  }

  @Patch('/favourite/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER || UserRole.ADMIN || UserRole.SUPERADMIN)
  updateFavourite(@Param('id') id: string, @Body() data: CreateQrFavouriteDto) {
    return this.qrService.updateFavourite(
      +id,
      data,
      data.subQrfavId,
      data.qrlekhId,
    );
  }
}

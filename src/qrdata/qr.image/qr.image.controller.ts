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
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../../@guards/jwt.guard';
import { validateFileName, imageFileFilter } from '../../photo-validate';
import { QrImageService } from './qr.image.service';

@Controller('qrlekh-sub-image')
@ApiTags('qrlekh-sub-image')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrSubImageController {
  constructor(private readonly qrService: QrImageService) {}

  @Get('/get-image')
  getQrlakeImage() {
    return this.qrService.getQrlekhImage();
  }

  @Get('/get-gallery')
  getSubQrlakeImage() {
    return this.qrService.getQrlekhGallery();
  }

  @Post('/create-image')
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
    @Body('qrlekhId') qrlekhId: any,
  ) {
    const image = `${process.env.HOST}/static/upload/${file.filename}`;
    return this.qrService.createQrlekhImage(image, Number(qrlekhId));
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

  @Post('/create-qr-gallery')
  @UseInterceptors(
    FilesInterceptor('gallery', 50, {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createQrGallery(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('qrlekhId') qrlekhId: any,
  ) {
    const res = [];
    files.forEach((file) => {
      const fileRes = {
        originalname: file.originalname,
        filename: file.filename,
      };
      res.push(fileRes);
    });
    const galleryMap = res.map(
      (e) => `${process.env.HOST}/static/upload/${e.filename}`,
    );
    return await this.qrService.createQrlekhGallery(+qrlekhId, galleryMap);
  }

  @Patch('/update-qr-gallery:id')
  @UseInterceptors(
    FilesInterceptor('gallery', 50, {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateQrGallery(
    @Param('id') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const res = [];
    files.forEach((file) => {
      const fileRes = {
        originalname: file.originalname,
        filename: file.filename,
      };
      res.push(fileRes);
    });
    const galleryMap = res.map(
      (e) => `${process.env.HOST}/static/upload/${e.filename}`,
    );
    return await this.qrService.updateQrlekhGallery({ id: +id }, galleryMap);
  }
}

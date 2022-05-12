import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
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
import { SubQrImageService } from './sub.qr.image.service';

@Controller('sub-qrlekh-image')
@ApiTags('sub-qrlekh-image')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SubQrImageController {
  constructor(private readonly qrService: SubQrImageService) {}

  @Get('/get-sub-qr-image')
  getSubQrlakeImage() {
    return this.qrService.getSubQrlekhImage();
  }

  @Get('/get-sub-qr-gallery')
  getSubQrlakeGallery() {
    return this.qrService.getSubQrlekhGallery();
  }

  @Post('/sub-create-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createSubQrImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('subQrImageId') subQrImageId: any,
  ) {
    const image = `${process.env.HOST}/static/upload/${file.filename}`;
    return this.qrService.createSubQrlekhImage(image, Number(subQrImageId));
  }

  @Patch('/sub-update-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateSubQrImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    const image = `${process.env.HOST}/static/upload/${file.filename}`;
    return await this.qrService.updateSubQrlekhImage(image, +id);
  }

  @Post('create-sub-qr-gallery')
  @UseInterceptors(
    FilesInterceptor('gallery', 50, {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createSubQrGallery(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('subQrImageId') subQrImageId: string,
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
    return await this.qrService.createSubQrlekhGallery(
      +subQrImageId,
      galleryMap,
    );
  }

  @Patch('/update-sub-qr-gallery/:id')
  @UseInterceptors(
    FilesInterceptor('gallery', 50, {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateSubQrGallery(
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
    return await this.qrService.updateSubQrlekhGallery({ id: +id }, galleryMap);
  }
}

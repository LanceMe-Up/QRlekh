import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QrImageController } from './qr.image.controller';
import { QrImageService } from './qr.image.service';

@Module({
  imports: [],
  controllers: [QrImageController],
  providers: [QrImageService, PrismaService],
  exports: [QrImageService],
})
export class QrImageModule {}

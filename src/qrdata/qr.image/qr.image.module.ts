import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { SubQrImageController } from '../sub.qr.image/sub.qr.image.controller';
import { SubQrImageModule } from '../sub.qr.image/sub.qr.image.module';
import { QrImageService } from './qr.image.service';

@Module({
  imports: [SubQrImageModule],
  controllers: [SubQrImageController],
  providers: [QrImageService, PrismaService],
  exports: [QrImageService],
})
export class QrImageModule {}

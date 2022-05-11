import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { SubQrImageController } from './sub.qr.image.controller';
import { SubQrImageService } from './sub.qr.image.service';

@Module({
  imports: [],
  controllers: [SubQrImageController],
  providers: [SubQrImageService, PrismaService],
  exports: [SubQrImageService],
})
export class SubQrImageModule {}

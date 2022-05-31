import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QrImageMappingController } from './qr.image.mapping.controller';
import { QrImageMappingService } from './qr.image.mapping.service';

@Module({
  imports: [],
  exports: [QrImageMappingService],
  controllers: [QrImageMappingController],
  providers: [QrImageMappingService, PrismaService],
})
export class QrImageMappingModule {}

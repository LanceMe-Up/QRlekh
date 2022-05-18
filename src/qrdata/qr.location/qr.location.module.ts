import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QrLocationController } from './qr.location.controller';
import { QrLocationService } from './qr.location.service';

@Module({
  imports: [],
  controllers: [QrLocationController],
  providers: [QrLocationService, PrismaService],
  exports: [QrLocationService],
})
export class QrLocationModule {}

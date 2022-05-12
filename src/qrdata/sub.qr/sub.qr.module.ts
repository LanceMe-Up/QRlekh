import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { SubQrController } from './sub.qr.controller';
import { SubQrService } from './sub.qr.service';
import { SlugifyService } from '../../slugify.service';

@Module({
  imports: [],
  controllers: [SubQrController],
  providers: [SubQrService, PrismaService, SlugifyService],
  exports: [SubQrService],
})
export class SubQrModule {}

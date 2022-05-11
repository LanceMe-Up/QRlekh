import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';
import { QrImageModule } from './qr.image/qr.image.module';
import { QrdataController } from './qrdata.controller';
import { QrdataService } from './qrdata.service';
import { QrTypeModule } from './qrtype/qrtype.module';
import { SubQrImageModule } from './sub.qr.image/sub.qr.image.module';
import { SubQrModule } from './sub.qr/sub.qr.module';

@Module({
  imports: [QrTypeModule, QrImageModule, SubQrImageModule, SubQrModule],
  controllers: [QrdataController],
  providers: [QrdataService, PrismaService, SlugifyService],
  exports: [QrdataService],
})
export class QrdataModule {}

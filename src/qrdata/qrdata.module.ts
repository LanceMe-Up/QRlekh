import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';
import { QrBookmarkModule } from './qr.bookmark/qr.bookmark.module';
import { QrFavouriteModule } from './qr.favourite/qr.favourite.module';
import { QrImageMappingModule } from './qr.image.mapping/qr.image.mapping.module';
import { QrImageModule } from './qr.image/qr.image.module';
import { QrLocationModule } from './qr.location/qr.location.module';
import { QrReviewModule } from './qr.reviews/qr.reviews.module';
import { QrdataController } from './qrdata.controller';
import { QrdataService } from './qrdata.service';
import { QrTypeModule } from './qrtype/qrtype.module';
import { SubQrImageModule } from './sub.qr.image/sub.qr.image.module';
import { SubQrModule } from './sub.qr/sub.qr.module';

@Module({
  imports: [
    QrTypeModule,
    QrImageModule,
    SubQrImageModule,
    SubQrModule,
    QrReviewModule,
    QrBookmarkModule,
    QrFavouriteModule,
    QrLocationModule,
    QrImageMappingModule,
  ],
  controllers: [QrdataController],
  providers: [QrdataService, PrismaService, SlugifyService],
  exports: [QrdataService],
})
export class QrdataModule {}

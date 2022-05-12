import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { TourReviewController } from './qr.reviews.controller';
import { QrReviewService } from './qr.reviews.service';

@Module({
  imports: [],
  exports: [QrReviewService],
  controllers: [TourReviewController],
  providers: [QrReviewService, PrismaService],
})
export class QrReviewModule {}

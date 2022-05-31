import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QrReviewController } from './qr.reviews.controller';
import { QrReviewService } from './qr.reviews.service';

@Module({
  imports: [],
  exports: [QrReviewService],
  controllers: [QrReviewController],
  providers: [QrReviewService, PrismaService],
})
export class QrReviewModule {}

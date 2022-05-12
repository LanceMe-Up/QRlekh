import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QrBookmarkController } from './qr.bookmark.controller';
import { QrBookmarkService } from './qr.bookmark.service';

@Module({
  imports: [],
  controllers: [QrBookmarkController],
  providers: [QrBookmarkService, PrismaService],
  exports: [QrBookmarkService],
})
export class QrBookmarkModule {}

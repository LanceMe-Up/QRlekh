import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QrFavouriteController } from './qr.favourite.controller';
import { QrFavouriteService } from './qr.favourite.service';

@Module({
  imports: [],
  controllers: [QrFavouriteController],
  providers: [QrFavouriteService, PrismaService],
  exports: [QrFavouriteService],
})
export class QrFavouriteModule {}

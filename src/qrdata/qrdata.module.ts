import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';
import { QrdataController } from './qrdata.controller';
import { QrdataService } from './qrdata.service';

@Module({
  imports: [],
  controllers: [QrdataController],
  providers: [QrdataService, PrismaService, SlugifyService],
  exports: [QrdataService],
})
export class QrdataModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QrdataController } from './qrdata.controller';
import { QrdataService } from './qrdata.service';

@Module({
  imports: [],
  controllers: [QrdataController],
  providers: [QrdataService, PrismaService],
  exports: [QrdataService],
})
export class QrdataModule {}

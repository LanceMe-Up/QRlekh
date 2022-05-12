import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ListTourController } from './qrtype.controller';
import { QrTypeService } from './qrtype.service';

@Module({
  imports: [],
  exports: [QrTypeService],
  controllers: [ListTourController],
  providers: [QrTypeService, PrismaService],
})
export class QrTypeModule {}

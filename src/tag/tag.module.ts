import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { PrismaService } from '../prisma.service';
import { TagService } from './tag.service';

@Module({
  providers: [TagService, PrismaService],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}

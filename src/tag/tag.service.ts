import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
// import * as geolib from 'geolib';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTag() {
    const data = await this.prismaService.tagName.findMany({});

    return { count: data.length, data };
  }

  async createQrTag(tag: Prisma.TagNameCreateInput, qrlekhId: number) {
    try {
      return await this.prismaService.tagName.create({
        data: {
          tagName: tag.tagName,
          qrlekhId,
        },
      });
    } catch (e) {
      return { log: e.message };
    }
  }

  async createSubQrTag(tag: Prisma.TagNameCreateInput, subtagId: number) {
    try {
      return await this.prismaService.tagName.create({
        data: {
          tagName: tag.tagName,
          subtagId,
        },
      });
    } catch (e) {
      return { log: e.message };
    }
  }

  async updateTag(
    tag: Prisma.TagNameUpdateInput,
    where: Prisma.TagNameWhereUniqueInput,
    subQr?: any,
    qr?: any,
  ) {
    try {
      const data = await this.prismaService.tagName.update({
        data: {
          tagName: tag.tagName,
          subtagId: subQr,
          qrlekhId: qr,
        },
        where,
      });
      return data;
    } catch (e) {
      return { log: e.message };
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { TagNotFoundException } from './tag.exception';
import * as geolib from 'geolib';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTag(tag: Prisma.TagNameCreateInput, user: any) {
    return this.prismaService.tagName.create({
      data: {
        tagName: tag.tagName,
        userId: user,
        lat: tag.lat,
        long: tag.long,
      },
    });
  }

  async getNearTag(where: Prisma.TagNameWhereUniqueInput) {
    const datum = await this.getTag();
    console.log(datum);
    return await this.prismaService.tagName.findUnique({
      where,
    });
  }

  async getTag() {
    const data = await this.prismaService.tagName.findMany({
      // include: {
      //   User: true,
      // },
    });

    return { count: data.length, data };
  }

  async distanceDB(lat: any, long: any) {
    const tagData = await this.getTag();
    const newData = tagData.data.map((i: any) => {
      const distance = this.caluclateDistance(lat, long, i.lat, i.long);
      return {
        distance,
        ...i,
      };
    });
    return newData;
  }

  caluclateDistance(ulat: any, ulong: any, dblat: any, dblong: any) {
    // const abc = this.distanceDB(ulat, ulong);
    // console.log(abc);

    const data = geolib.getDistance(
      { latitude: ulat, longitude: ulong },
      { latitude: dblat, longitude: dblong },
    );

    return data;
  }

  async getTaging(lat: number, long: number) {
    const data = await this.prismaService.tagName.findMany({
      where: {
        AND: [
          {
            lat: {
              lte: lat,
            },
            long: {
              lte: long,
            },
          },
        ],
      },
      include: {
        User: true,
      },
    });

    return { count: data.length, data };
  }

  async getTagId(id: Prisma.TagNameWhereUniqueInput) {
    const datum = await this.getTag();
    if (!datum) {
      return '';
    }
    console.log(JSON.stringify(datum));
    const data = this.prismaService.tagName.findUnique({ where: id });

    if (!data) {
      throw new TagNotFoundException(+id);
    }

    return data;
  }

  async deleteTag(ids: number) {
    await this.prismaService.tagName.delete({
      where: { id: Number(ids) },
    });

    return { success: true, data: `Delete Tag with id ${ids}` };
  }
}

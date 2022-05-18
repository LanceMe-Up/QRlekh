import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrLocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNearDistrict(params: {
    lat?: number;
    long?: number;
    skip?: number;
    limit?: number;
  }) {
    const { lat, long, skip, limit } = params;
    console.log(skip, limit);
    try {
      const data = await this.prismaService
        .$queryRaw`SELECT *, ST_DISTANCE_SPHERE(POINT(${long}, ${lat}), POINT(long, lat)) AS dist from QrLocation`;
      if (!data) {
        return { md: 'not found' };
      }
      return data;
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }
  }

  async getLocation() {
    try {
      const data = await this.prismaService.qrLocation.findMany({});
      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createQrLekhLocation(
    dataFav: Prisma.QrLocationCreateInput,
    qrlekhId: number,
  ) {
    try {
      const data = await this.prismaService.qrLocation.create({
        data: {
          name: dataFav.name,
          lat: dataFav.lat,
          long: dataFav.long,
          qrlekhId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createSubQrLekhLocation(
    dataFav: Prisma.QrLocationCreateInput,
    subqrId: number,
  ) {
    try {
      const data = await this.prismaService.qrLocation.create({
        data: {
          name: dataFav.name,
          lat: dataFav.lat,
          long: dataFav.long,
          subqrId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateQrLocation(id: number, dataFav: Prisma.QrLocationUpdateInput) {
    try {
      const data = await this.prismaService.qrLocation.update({
        where: {
          id,
        },
        data: {
          name: dataFav.name,
          lat: dataFav.lat,
          long: dataFav.long,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}

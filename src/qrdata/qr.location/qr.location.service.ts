import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { GetLocationDto } from './dto/create.location.dto';
import geoip from 'geoip-lite';

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
        .$queryRaw`SELECT *, ST_DistanceSphere(POINT(${long}, ${lat}), POINT(long, lat)) AS dist from "QrLocation"`;
      // .$queryRaw`SELECT *, (point(long, lat) <@> point(${long}, ${lat})) AS distance from "QrLocation" WHERE (point(long, lat) <@> point(${long}, ${lat}))`;
      if (!data) {
        return { md: 'not found' };
      }
      return data;
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }
  }
  // ST_DistanceSphere
  // const data = await this.prismaService
  // .$queryRaw`SELECT *, ST_DISTANCE_SPHERE(POINT(${long}, ${lat}), POINT(long, lat)) AS dist from "QrLocation"`;

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

  async findAllByRadius(getLocationProjectDto: GetLocationDto) {
    const { ip_address, radius, is_metric, long, lat } = getLocationProjectDto;
    let loni = long;
    let lati = lat;
    // FALLBACK TO IP_ADDRESS
    if (!long || !lat) {
      if (ip_address) {
        let geo = null;
        try {
          geo = await geoip.lookup(ip_address);
        } catch {}

        if (geo) {
          loni = geo.ll[0];
          lati = geo.ll[1];
        }
      }
    }
    if (loni && lati) {
      return await this.prismaService
        .$queryRaw`SELECT *, (point(long, lat) <@> point(${loni}, ${lati})) AS distance
          FROM "QrLocation"
          WHERE (point(long, lat) <@> point(${loni}, ${lati})) <= 
          ${radius * (is_metric ? 1000 : 1609.34)}`;
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

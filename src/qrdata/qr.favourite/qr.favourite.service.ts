import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrFavouriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFavourite() {
    try {
      const data = await this.prismaService.qrFavourite.findMany();
      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createQrFavourite(
    dataFav: Prisma.QrFavouriteCreateInput,
    qrlekhId: number,
    userId: number,
  ) {
    try {
      const data = await this.prismaService.qrFavourite.create({
        data: {
          favourite: dataFav.favourite,
          qrlekhId,
          userId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createSubQrFavourite(
    dataFav: Prisma.QrFavouriteCreateInput,
    subQrfavId: number,
    userId: number,
  ) {
    try {
      const data = await this.prismaService.qrFavourite.create({
        data: {
          favourite: dataFav.favourite,
          subQrfavId,
          userId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateQrFavourite(
    id: number,
    dataFav: Prisma.QrFavouriteUpdateInput,
    qrlekhId: number,
  ) {
    try {
      const data = await this.prismaService.qrFavourite.update({
        where: {
          id,
        },
        data: {
          favourite: dataFav.favourite,
          qrlekhId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}

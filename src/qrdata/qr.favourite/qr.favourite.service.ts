import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrFavouriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFavourite() {
    try {
      const data = await this.prismaService.qrFavourite.findMany({
        include: {
          qrlekhData: {
            select: {
              title: true,
              desc: true,
              knownFor: true,
              image: {
                select: {
                  image: true,
                },
              },
              gallery: {
                select: {
                  gallery: true,
                },
              },
            },
          },
          SubQrlekhData: {
            select: {
              title: true,
              desc: true,
              knownFor: true,
              image: {
                select: {
                  image: true,
                },
              },
              gallery: {
                select: {
                  gallery: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async findUserFavourite(uid: number) {
    try {
      const data = await this.prismaService.qrFavourite.findMany({
        where: {
          userId: uid,
        },
        include: {
          qrlekhData: {
            select: {
              title: true,
              desc: true,
              knownFor: true,
              image: {
                select: {
                  image: true,
                },
              },
              gallery: {
                select: {
                  gallery: true,
                },
              },
            },
          },
          SubQrlekhData: {
            select: {
              title: true,
              desc: true,
              knownFor: true,
              image: {
                select: {
                  image: true,
                },
              },
              gallery: {
                select: {
                  gallery: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
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
      const fav = await this.checkFavouriteId(userId, qrlekhId);
      if (fav.length !== 0) {
        throw new HttpException(
          'already favourite this post',
          HttpStatus.CONFLICT,
        );
      } else {
        const data = await this.prismaService.qrFavourite.create({
          data: {
            favourite: dataFav.favourite,
            qrlekhId,
            userId,
          },
        });
        return { data };
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checkFavouriteId(userId: number, qrlekhId: number) {
    const post = await this.prismaService.qrFavourite.findMany({
      where: {
        userId,
        qrlekhId,
      },
    });
    if (!post) {
      throw new BadRequestException({ message: `not found ${userId}` });
    }
    return post;
  }

  async checksubFavouriteId(userId: number, subQrfavId: number) {
    const post = await this.prismaService.qrFavourite.findMany({
      where: {
        userId,
        subQrfavId,
      },
    });
    if (!post) {
      throw new BadRequestException({ message: `not found ${userId}` });
    }
    return post;
  }

  async createSubQrFavourite(
    dataFav: Prisma.QrFavouriteCreateInput,
    subQrfavId: number,
    userId: number,
  ) {
    try {
      const fav = await this.checksubFavouriteId(userId, subQrfavId);
      if (fav.length !== 0) {
        throw new HttpException(
          'already favourite this post',
          HttpStatus.CONFLICT,
        );
      }
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
    userId: number,
    dataFav: Prisma.QrFavouriteUpdateInput,
  ) {
    try {
      const check = await this.findUserFavourite(userId);
      if (check) {
        const data = await this.prismaService.qrFavourite.updateMany({
          where: {
            id,
            userId,
          },
          data: {
            favourite: dataFav.favourite,
          },
        });
        return { data };
      }
      return { msg: 'not found' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateSubQrFavourite(
    id: number,
    userId: number,
    dataFav: Prisma.QrFavouriteUpdateInput,
  ) {
    try {
      const check = await this.findUserFavourite(userId);
      if (check) {
        const data = await this.prismaService.qrFavourite.updateMany({
          where: {
            id,
            userId,
          },
          data: {
            favourite: dataFav.favourite,
          },
        });
        return { data };
      }
      return { msg: 'no' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}

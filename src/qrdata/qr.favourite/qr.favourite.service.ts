import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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

  async createQrFavourite(qrlekhId: number, userId: number) {
    try {
      const fav = await this.checkFavouriteId(userId, qrlekhId);
      if (fav.length !== 0) {
        await this.prismaService.qrFavourite.deleteMany({
          where: {
            userId,
            qrlekhId,
          },
        });
        return { msg: 'favourite is unmark' };
      } else {
        await this.prismaService.qrFavourite.create({
          data: {
            qrlekhId,
            userId,
          },
        });
        return { msg: 'favourite is mark' };
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checkFavouriteId(userId: number, qrlekhId: number) {
    try {
      const findFavourite = await this.prismaService.qrFavourite.findMany({
        where: {
          userId,
          qrlekhId,
        },
      });
      if (!findFavourite) {
        throw new BadRequestException({ message: `not found ${userId}` });
      }
      return findFavourite;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checksubFavouriteId(userId: number, subQrfavId: number) {
    try {
      const checkingSubQr = await this.prismaService.qrFavourite.findMany({
        where: {
          userId,
          subQrfavId,
        },
      });
      if (!checkingSubQr) {
        throw new BadRequestException({ message: `not found ${userId}` });
      }
      return checkingSubQr;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createSubQrFavourite(subQrfavId: number, userId: number) {
    try {
      const fav = await this.checksubFavouriteId(userId, subQrfavId);
      if (fav.length !== 0) {
        await this.prismaService.qrFavourite.deleteMany({
          where: {
            userId,
            subQrfavId,
          },
        });
        return { msg: 'favourite is unmark on sub qr' };
      }
      await this.prismaService.qrFavourite.create({
        data: {
          subQrfavId,
          userId,
        },
      });
      return { msg: 'favourite is mark on sub qr' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // async updateQrFavourite(
  //   id: number,
  //   userId: number,
  //   dataFav: Prisma.QrFavouriteUpdateInput,
  // ) {
  //   try {
  //     const check = await this.findUserFavourite(userId);
  //     if (check) {
  //       const data = await this.prismaService.qrFavourite.updateMany({
  //         where: {
  //           id,
  //           userId,
  //         },
  //         data: {
  //           favourite: dataFav.favourite,
  //         },
  //       });
  //       return { data };
  //     }
  //     return { msg: 'not found' };
  //   } catch (e) {
  //     throw new BadRequestException({ message: e.message });
  //   }
  // }

  async updateUpSertQrFavourite(id: number, userId: number, qrlekhId: number) {
    try {
      const fav = await this.checkFavouriteId(userId, qrlekhId);

      if (fav.length !== 0) {
        throw new HttpException(
          'already favourite this post',
          HttpStatus.CONFLICT,
        );
      }

      const data = await this.prismaService.qrFavourite.upsert({
        where: {
          id,
        },
        create: {
          qrlekhId,
          userId,
        },
        update: {
          qrlekhId,
          userId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // async updateSubQrFavourite(
  //   id: number,
  //   userId: number,
  //   dataFav: Prisma.QrFavouriteUpdateInput,
  // ) {
  //   try {
  //     const check = await this.findUserFavourite(userId);
  //     if (check) {
  //       const data = await this.prismaService.qrFavourite.updateMany({
  //         where: {
  //           id,
  //           userId,
  //         },
  //         data: {
  //           favourite: dataFav.favourite,
  //         },
  //       });
  //       return { data };
  //     }
  //     return { msg: 'no' };
  //   } catch (e) {
  //     throw new BadRequestException({ message: e.message });
  //   }
  // }
}

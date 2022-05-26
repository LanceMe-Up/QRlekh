import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrBookmarkService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBookmark() {
    try {
      const data = await this.prismaService.qrBookmark.findMany({
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
      });
      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async findUserBookMark(uid: number) {
    try {
      const data = await this.prismaService.qrBookmark.findMany({
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
      });
      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createQrBookmark(
    dataBookmark: Prisma.QrBookmarkCreateInput,
    qrlekhId: number,
    userId: number,
  ) {
    try {
      const bookmarkCheck = await this.checBookmarkId(userId, qrlekhId);
      if (bookmarkCheck.length !== 0) {
        throw new HttpException(
          'already bookmark this qrlekh',
          HttpStatus.CONFLICT,
        );
      }
      const data = await this.prismaService.qrBookmark.create({
        data: {
          expiryDate: dataBookmark.expiryDate,
          qrlekhId,
          userId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checksubBookmarkId(userId: number, subQrlekhId: number) {
    const post = await this.prismaService.qrBookmark.findMany({
      where: {
        userId,
        subQrlekhId,
      },
    });
    if (!post) {
      throw new BadRequestException({ message: `not found ${userId}` });
    }
    return post;
  }

  async createSubQrBookmark(
    dataBookmark: Prisma.QrBookmarkCreateInput,
    subQrlekhId: number,
    userId: number,
  ) {
    try {
      const bookmarkCheck = await this.checksubBookmarkId(userId, subQrlekhId);
      if (bookmarkCheck.length !== 0) {
        throw new HttpException(
          'already sub bookmark this qrlekh',
          HttpStatus.CONFLICT,
        );
      }
      const data = await this.prismaService.qrBookmark.create({
        data: {
          expiryDate: dataBookmark.expiryDate,
          subQrlekhId,
          userId,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateQrBookmark(
    id: number,
    userId: number,
    dataBookmark: Prisma.QrBookmarkUpdateInput,
  ) {
    try {
      const data = await this.prismaService.qrBookmark.updateMany({
        where: {
          id,
          userId,
        },
        data: {
          expiryDate: dataBookmark.expiryDate,
        },
      });
      return { data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checBookmarkId(userId: number, qrlekhId: number) {
    const post = await this.prismaService.qrFavourite.findMany({
      where: {
        userId,
        qrlekhId,
      },
    });
    if (!post) {
      throw new BadRequestException({ message: `not found ${qrlekhId}` });
    }
    return post;
  }
}

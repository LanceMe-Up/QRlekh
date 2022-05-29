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

  async createQrBookmark(qrlekhId: number, userId: number) {
    try {
      // calculate date from 7 days
      const date = new Date();
      date.setDate(date.getDate() + 7);

      const bookmarkCheck = await this.checBookmarkId(userId, qrlekhId);
      if (bookmarkCheck.length !== 0) {
        throw new HttpException(
          'already bookmark this qrlekh',
          HttpStatus.CONFLICT,
        );
      }
      const data = await this.prismaService.qrBookmark.create({
        data: {
          expiryDate: date,
          isBookmark: true,
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

  async createSubQrBookmark(subQrlekhId: number, userId: number) {
    try {
      // calculate date from 7 days
      const subqrdate = new Date();
      subqrdate.setDate(subqrdate.getDate() + 7);

      const bookmarkCheck = await this.checksubBookmarkId(userId, subQrlekhId);
      if (bookmarkCheck.length !== 0) {
        throw new HttpException(
          'already sub bookmark this qrlekh',
          HttpStatus.CONFLICT,
        );
      }
      const data = await this.prismaService.qrBookmark.create({
        data: {
          expiryDate: subqrdate,
          isBookmark: true,
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
      const expirDate = new Date();
      expirDate.setDate(expirDate.getDate() + 7);
      const check = await this.findUserBookMark(userId);
      if (check) {
        const data = await this.prismaService.qrBookmark.updateMany({
          where: {
            id,
            userId,
          },
          data: {
            expiryDate: expirDate,
            isBookmark: dataBookmark.isBookmark,
          },
        });
        return { data };
      }
      return { msg: 'not found' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checBookmarkId(userId: number, qrlekhId: number) {
    const post = await this.prismaService.qrBookmark.findMany({
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

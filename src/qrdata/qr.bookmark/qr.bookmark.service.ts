import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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

  async createQrBookmark(qrlekhId: number, userId: number) {
    try {
      const bookmarkCheck = await this.checBookmarkId(userId, qrlekhId);
      if (bookmarkCheck.length !== 0) {
        return await this.deleteQrBookmark(userId, qrlekhId);
      }
      await this.prismaService.qrBookmark.create({
        data: {
          userId,
          qrlekhId,
        },
      });
      return { msg: 'QR Bookmark is mark' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checksubBookmarkId(userId: number, subQrlekhId: number) {
    try {
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
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createSubQrBookmark(subQrlekhId: number, userId: number) {
    try {
      const bookmarkCheck = await this.checksubBookmarkId(userId, subQrlekhId);
      if (bookmarkCheck.length !== 0) {
        return await this.deleteQrBookmark(userId, null, subQrlekhId);
      }
      await this.prismaService.qrBookmark.create({
        data: {
          subQrlekhId,
          userId,
        },
      });
      return { msg: 'SubQR Bookmark is marked' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async deleteQrBookmark(userId?: any, qrlekhId?: any, subQrlekhId?: any) {
    try {
      await this.prismaService.qrBookmark.deleteMany({
        where: {
          userId,
          qrlekhId,
          subQrlekhId,
        },
      });
      return { message: 'bookmark is unmarked' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 12);
    await this.prismaService.qrBookmark.deleteMany({
      where: {
        createdAt: {
          gt: currentDate,
        },
      },
    });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { SlugifyService } from '../../slugify.service';

@Injectable()
export class SubQrService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slugifyService: SlugifyService,
  ) {}

  async createSubQr(
    createQr: Prisma.SubQrlekhDataCreateInput,
    userId: any,
    qrlekhDataId: any,
  ) {
    try {
      const slug: string = this.slugifyService.toSlug(createQr.title);
      return await this.prismaService.subQrlekhData.create({
        data: {
          knownFor: createQr.knownFor,
          title: createQr.title,
          slug,
          visitor: createQr.visitor,
          location: createQr.location,
          desc: createQr.desc,
          like: createQr.like,
          userId,
          qrlekhDataId,
        },
      });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getSubQr() {
    const data = await this.prismaService.subQrlekhData.findMany({
      include: {
        User: {
          select: {
            username: true,
            email: true,
            id: true,
          },
        },
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
        qrReviews: {
          select: {
            rating: true,
            israting: true,
            desc: true,
            User: {
              select: {
                username: true,
                email: true,
                id: true,
              },
            },
          },
        },
        tag: {
          select: {
            tagName: true,
          },
        },
        qrBookmark: true,
        favourite: true,
        QrlekhData: {
          select: {
            id: true,
            title: true,
          },
        },
        type: {
          select: {
            type: true,
          },
        },
      },
    });

    return { count: data.length, data };
  }

  async getBySubQrId(id: Prisma.SubQrlekhDataWhereUniqueInput) {
    try {
      const data = this.prismaService.subQrlekhData.findMany({
        where: {
          id: id.id,
        },
        include: {
          User: {
            select: {
              username: true,
              email: true,
              id: true,
            },
          },
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
          qrReviews: {
            select: {
              rating: true,
              israting: true,
              desc: true,
              User: {
                select: {
                  username: true,
                  email: true,
                  id: true,
                },
              },
            },
          },
          tag: {
            select: {
              tagName: true,
            },
          },
          qrBookmark: true,
          favourite: true,
          type: {
            select: {
              type: true,
            },
          },
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getBySubQrSlug(slug: string) {
    try {
      // for visitors
      await this.prismaService.subQrlekhData.updateMany({
        where: {
          slug: slug,
        },
        data: {
          visitor: {
            increment: 1,
          },
        },
      });

      const data = await this.prismaService.subQrlekhData.findMany({
        where: {
          slug,
        },
        include: {
          User: {
            select: {
              username: true,
              email: true,
              id: true,
            },
          },
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
          qrReviews: {
            select: {
              rating: true,
              israting: true,
              desc: true,
              User: {
                select: {
                  username: true,
                  email: true,
                  id: true,
                },
              },
            },
          },
          tag: {
            select: {
              tagName: true,
            },
          },
          qrBookmark: true,
          favourite: true,
          type: {
            select: {
              type: true,
            },
          },
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}

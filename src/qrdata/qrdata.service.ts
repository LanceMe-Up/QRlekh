import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';

@Injectable()
export class QrdataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slugifyService: SlugifyService,
  ) {}

  async createQr(
    createQr: Prisma.QrlekhDataCreateInput,
    userId: any,
    categoryId: any,
  ) {
    try {
      const slug: string = this.slugifyService.toSlug(createQr.title);
      return await this.prismaService.qrlekhData.create({
        data: {
          knownFor: createQr.knownFor,
          title: createQr.title,
          slug,
          location: createQr.location,
          desc: createQr.desc,
          like: createQr.like,
          dislike: createQr.dislike,
          userId,
          categoryId,
        },
      });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async get() {
    const data = await this.prismaService.qrlekhData.findMany({
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
        subQrlekh: true,
      },
    });

    return { count: data.length, data };
  }

  async getById(id: Prisma.QrlekhDataWhereUniqueInput) {
    try {
      const data = this.prismaService.qrlekhData.findMany({
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
          subQrlekh: true,
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getBySlug(slug: string) {
    try {
      const data = this.prismaService.qrlekhData.findMany({
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
          subQrlekh: true,
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // async deleteData(id: number) {
  //   await this.prismaService.qrlekhData.delete({
  //     where: { id: Number(id) },
  //   });

  //   return { success: true, data: `Delete with id ${id}` };
  // }

  async setQrlekhImage(image: any, qrlekhId: any, subQrImageId: any) {
    try {
      const profile = this.prismaService.qrlekhImage.create({
        data: {
          image,
          qrlekhId,
          subQrImageId,
        },
      });
      return profile;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateQrlekhImage(image: any, id: number) {
    try {
      const profile = this.prismaService.qrlekhImage.update({
        where: {
          id,
        },
        data: {
          image,
        },
      });
      return profile;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // start sub-child
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
          location: createQr.location,
          desc: createQr.desc,
          like: createQr.like,
          dislike: createQr.dislike,
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
      },
    });

    return { count: data.length, data };
  }
}

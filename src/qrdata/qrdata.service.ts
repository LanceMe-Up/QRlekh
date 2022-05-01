import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    tagNameId: any,
  ) {
    try {
      const slug: string = this.slugifyService.toSlug(createQr.name);
      return await this.prismaService.qrlekhData.create({
        data: {
          category: createQr.category,
          knownFor: createQr.knownFor,
          location: createQr.location,
          slug,
          rating: createQr.rating,
          name: createQr.name,
          desc: createQr.desc,
          favourite: createQr.favourite,
          like: createQr.like,
          dislike: createQr.dislike,
          userId,
          tagNameId,
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
            id: true,
          },
        },
        TagName: true,
        image: {
          select: {
            image: true,
          },
        },
      },
    });

    return { count: data.length, data };
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
              id: true,
              username: true,
              email: true,
            },
          },
          TagName: {
            select: {
              id: true,
              tagName: true,
              lat: true,
              long: true,
              userId: true,
            },
          },
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async deleteData(id: number) {
    await this.prismaService.qrlekhData.delete({
      where: { id: Number(id) },
    });

    return { success: true, data: `Delete with id ${id}` };
  }

  async setQrlekhImage(image: any, qrlekhDataId: any) {
    try {
      const profile = this.prismaService.qrlekhImage.create({
        data: {
          image,
          qrlekhDataId,
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
}

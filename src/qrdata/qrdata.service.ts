import { Injectable } from '@nestjs/common';
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
    id: number,
    tagId: number,
  ) {
    const slug: string = this.slugifyService.toSlug(createQr.name);
    return this.prismaService.qrlekhData.create({
      data: {
        desc: createQr.desc,
        slug,
        name: createQr.name,
        category: createQr.category,
        knownFor: createQr.knownFor,
        location: createQr.location,
        rating: createQr.rating,
        userId: id,
        tagNameId: tagId,
      },
    });
  }

  async get() {
    const data = this.prismaService.qrlekhData.findMany({
      include: {
        user: true,
        TagName: true,
      },
    });

    return data;
  }

  async getBySlug(slug: string) {
    const data = this.prismaService.qrlekhData.findMany({
      where: {
        slug,
      },
      include: {
        user: {
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
  }

  async deleteData(id: number) {
    await this.prismaService.qrlekhData.delete({
      where: { id: Number(id) },
    });

    return { success: true, data: `Delete with id ${id}` };
  }
}

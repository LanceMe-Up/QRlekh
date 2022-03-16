import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QrdataService {
  constructor(private prismaService: PrismaService) {}

  async createQr(
    createQr: Prisma.QrlakeDataCreateInput,
    id: number,
    tagId: number,
  ) {
    return this.prismaService.qrlakeData.create({
      data: {
        desc: createQr.desc,
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
    return this.prismaService.qrlakeData.findMany({
      include: {
        user: true,
        TagName: true,
      },
    });
  }

  async deleteData(id: number) {
    await this.prismaService.qrlakeData.delete({
      where: { id: Number(id) },
    });

    return { success: true, data: `Delete with id ${id}` };
  }
}

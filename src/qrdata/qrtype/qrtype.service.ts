import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQrType() {
    const data = await this.prismaService.qrType.findMany({
      include: {
        qrlekh: {
          select: {
            id: true,
            title: true,
            updatedAt: true,
          },
        },
        SubQrlekhData: {
          select: {
            id: true,
            title: true,
            updatedAt: true,
          },
        },
      },
    });

    return { count: data.length, data };
  }

  async createQrType(createIti: Prisma.QrTypeCreateInput, qrlekhId: number) {
    try {
      return await this.prismaService.qrType.create({
        data: {
          type: createIti.type,
          qrlekhId,
        },
      });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createSubQrType(
    createIti: Prisma.QrTypeCreateInput,
    subQrlekhId: number,
  ) {
    try {
      return await this.prismaService.qrType.create({
        data: {
          type: createIti.type,
          subQrlekhId,
        },
      });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}

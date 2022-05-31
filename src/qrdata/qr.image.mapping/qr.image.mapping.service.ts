import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrImageMappingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllImageMapping() {
    try {
      const data = await this.prismaService.qrImageMapping.findMany({
        include: {
          QrlekhImage: {
            select: {
              id: true,
              image: true,
            },
          },
        },
      });

      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createImageMapping(
    dataMapping: Prisma.QrImageMappingCreateInput,
    qrMappingId: number,
  ) {
    return await this.prismaService.qrImageMapping.create({
      data: {
        desc: dataMapping.desc,
        title: dataMapping.title,
        shape: dataMapping.shape,
        coords: dataMapping.coords,
        preFillColor: dataMapping.preFillColor,
        fillColor: dataMapping.fillColor,
        strokeColor: dataMapping.strokeColor,
        qrMappingId,
      },
    });
  }

  async updateImageMapping(
    data: Prisma.QrImageMappingUpdateInput,
    where: Prisma.QrImageMappingWhereUniqueInput,
  ) {
    try {
      return this.prismaService.qrImageMapping.update({
        data,
        where,
      });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async deleteImageMapping(where: Prisma.QrImageMappingWhereUniqueInput) {
    try {
      return this.prismaService.qrImageMapping.delete({ where });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}

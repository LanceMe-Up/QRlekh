import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrImageService {
  constructor(private readonly prismaService: PrismaService) {}

  async createQrlekhImage(image: any, qrlekhId: any) {
    try {
      const profile = await this.prismaService.qrlekhImage.create({
        data: {
          image,
          qrlekhId,
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

  async getQrlekhImage() {
    try {
      const data = await this.prismaService.qrlekhImage.findMany({
        include: {
          QrImageMapping: {
            select: {
              id: true,
              desc: true,
              title: true,
              shape: true,
              coords: true,
              preFillColor: true,
              fillColor: true,
              strokeColor: true,
            },
          },
          QrlekhData: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getQrlekhGallery() {
    try {
      const data = await this.prismaService.qrlekhGallery.findMany({});

      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createQrlekhGallery(qrlekhId: number, gallery: any) {
    try {
      return await this.prismaService.qrlekhGallery.create({
        data: {
          gallery,
          qrlekhId,
        },
      });
    } catch (e) {
      return { msg: e.message };
    }
  }

  async updateQrlekhGallery(
    where?: Prisma.QrlekhGalleryWhereUniqueInput,
    gallery?: any,
    qrlekhId?: number,
  ) {
    try {
      return await this.prismaService.qrlekhGallery.update({
        data: {
          gallery,
          qrlekhId,
        },
        where,
      });
    } catch (e) {
      throw new BadRequestException({
        statusCode: 400,
        message: e.message,
      });
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class SubQrImageService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSubQrlekhImage() {
    const data = await this.prismaService.subQrlekhImage.findMany({
      include: {
        SubQrlekhData: true,
      },
    });

    return { count: data.length, data };
  }

  async createSubQrlekhImage(image: any, subQrImageId: any) {
    try {
      const subImage = this.prismaService.subQrlekhImage.create({
        data: {
          image,
          subQrImageId,
        },
      });
      return subImage;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateSubQrlekhImage(image: any, id: number) {
    try {
      const subImage = this.prismaService.subQrlekhImage.update({
        where: {
          id,
        },
        data: {
          image,
        },
      });
      return subImage;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getSubQrlekhGallery() {
    const data = await this.prismaService.subQrlekhGallery.findMany({
      include: {
        SubQrlekhData: true,
      },
    });

    return { count: data.length, data };
  }

  async createSubQrlekhGallery(subQrImageId: number, gallery: any) {
    try {
      return await this.prismaService.subQrlekhGallery.create({
        data: {
          gallery,
          subQrImageId,
        },
      });
    } catch (e) {
      return { msg: e.message };
    }
  }

  async updateSubQrlekhGallery(
    where?: Prisma.SubQrlekhGalleryWhereUniqueInput,
    gallery?: any,
    subQrImageId?: number,
  ) {
    try {
      return await this.prismaService.subQrlekhGallery.update({
        data: {
          gallery,
          subQrImageId,
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

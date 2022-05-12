import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class QrReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async getReview() {
    try {
      const data = await this.prismaService.qrReviews.findMany({
        include: {
          qrlekh: true,
          User: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      });

      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async createReview(
    dataReview: Prisma.QrReviewsCreateInput,
    uId: any,
    qrlekhId: any,
  ) {
    return await this.prismaService.qrReviews.create({
      data: {
        desc: dataReview.desc,
        userId: uId,
        rating: dataReview.rating,
        israting: dataReview.israting,
        qrlekhId,
      },
    });
  }

  async createSubReview(
    dataReview: Prisma.QrReviewsCreateInput,
    uId: any,
    subQrlekhDataId: any,
  ) {
    return await this.prismaService.qrReviews.create({
      data: {
        desc: dataReview.desc,
        userId: uId,
        rating: dataReview.rating,
        israting: dataReview.israting,
        subQrlekhDataId,
      },
    });
  }

  async updateReview(
    data: Prisma.QrReviewsUpdateInput,
    where: Prisma.QrReviewsWhereUniqueInput,
  ) {
    try {
      return this.prismaService.qrReviews.update({
        data,
        where,
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async deleteReview(where: Prisma.QrReviewsWhereUniqueInput) {
    try {
      return this.prismaService.qrReviews.delete({ where });
    } catch (e) {
      throw new BadRequestException();
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(dataCategory: Prisma.CategoryCreateInput, userId: any) {
    try {
      const checkName = await this.prismaService.category.findMany({
        where: {
          name: {
            mode: 'insensitive',
          },
        },
      });
      console.log(checkName);
      if (checkName) {
        return { msg: 'name must be unique' };
      }
      const data = this.prismaService.category.create({
        data: {
          name: dataCategory.name,
          userId,
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ log: e.message });
    }
  }

  async getCategory() {
    try {
      const data = await this.prismaService.category.findMany({
        where: {
          name: {
            mode: 'insensitive',
          },
        },
        include: {
          User: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return { count: data.length, data };
    } catch (e) {
      throw new BadRequestException({ log: e.message });
    }
  }
}

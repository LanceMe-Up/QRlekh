import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { TagNotFoundException } from './tag.exception';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTag(tag: Prisma.TagNameCreateInput, user: any) {
    return this.prismaService.tagName.create({
      data: {
        tagName: tag.tagName,
        userId: user,
      },
    });
  }

  async getTag() {
    return this.prismaService.tagName.findMany({
      include: {
        User: true,
      },
    });
  }

  async getTagId(id: Prisma.TagNameWhereUniqueInput) {
    const data = this.prismaService.tagName.findUnique({ where: id });

    if (!data) {
      throw new TagNotFoundException(+id);
    }

    return data;
  }

  async deleteTag(ids: number) {
    await this.prismaService.tagName.delete({
      where: { id: Number(ids) },
    });

    return { success: true, data: `Delete Tag with id ${ids}` };
  }
}

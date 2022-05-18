import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
    categoryId: any,
  ) {
    try {
      const slug: string = this.slugifyService.toSlug(createQr.title);
      return await this.prismaService.qrlekhData.create({
        data: {
          knownFor: createQr.knownFor,
          title: createQr.title,
          slug,
          visitor: createQr.visitor,
          desc: createQr.desc,
          like: createQr.like,
          isFeature: createQr.isFeature,
          userId,
          categoryId,
        },
      });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateQr(
    createQr: Prisma.QrlekhDataUpdateInput,
    userId: any,
    categoryId: any,
    slugs: string,
  ) {
    try {
      const title: any = createQr.title;
      const slug: string = this.slugifyService.toSlug(title);
      return await this.prismaService.qrlekhData.updateMany({
        where: {
          slug: slugs,
        },
        data: {
          knownFor: createQr.knownFor,
          title: createQr.title,
          slug,
          visitor: createQr.visitor,
          desc: createQr.desc,
          like: createQr.like,
          isFeature: createQr.isFeature,
          userId,
          categoryId,
        },
      });
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async updateFeature(isFeature: boolean, id: number) {
    try {
      await this.prismaService.qrlekhData.update({
        data: {
          isFeature,
        },
        where: {
          id,
        },
      });
      return { data: 'update successfully!' };
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
            email: true,
            id: true,
          },
        },
        image: {
          select: {
            image: true,
          },
        },
        gallery: {
          select: {
            gallery: true,
          },
        },
        qrReviews: {
          select: {
            rating: true,
            israting: true,
            desc: true,
            User: {
              select: {
                username: true,
                email: true,
                id: true,
              },
            },
          },
        },
        tag: {
          select: {
            tagName: true,
          },
        },
        qrBookmark: true,
        favourite: true,
        subQrlekh: true,
        type: {
          select: {
            type: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return { count: data.length, data };
  }

  async getById(id: Prisma.QrlekhDataWhereUniqueInput) {
    try {
      const data = this.prismaService.qrlekhData.findMany({
        where: {
          id: id.id,
        },
        include: {
          User: {
            select: {
              username: true,
              email: true,
              id: true,
            },
          },
          image: {
            select: {
              image: true,
            },
          },
          gallery: {
            select: {
              gallery: true,
            },
          },
          qrReviews: {
            select: {
              rating: true,
              israting: true,
              desc: true,
              User: {
                select: {
                  username: true,
                  email: true,
                  id: true,
                },
              },
            },
          },
          tag: {
            select: {
              tagName: true,
            },
          },
          qrBookmark: true,
          favourite: true,
          subQrlekh: true,
          type: {
            select: {
              type: true,
            },
          },
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getBySlug(slug: string) {
    try {
      // for visitors
      await this.prismaService.qrlekhData.updateMany({
        where: {
          slug: slug,
        },
        data: {
          visitor: {
            increment: 1,
          },
        },
      });

      // for slug
      const data = await this.prismaService.qrlekhData.findMany({
        where: {
          slug,
        },
        include: {
          User: {
            select: {
              username: true,
              email: true,
              id: true,
            },
          },
          image: {
            select: {
              image: true,
            },
          },
          gallery: {
            select: {
              gallery: true,
            },
          },
          qrReviews: {
            select: {
              rating: true,
              israting: true,
              desc: true,
              User: {
                select: {
                  username: true,
                  email: true,
                  id: true,
                },
              },
            },
          },
          tag: {
            select: {
              tagName: true,
            },
          },
          qrBookmark: true,
          favourite: true,
          subQrlekh: true,
          type: {
            select: {
              type: true,
            },
          },
        },
      });

      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // add a like from a qrlekh data
  async getLike(postId: Prisma.QrlekhDataWhereUniqueInput, userId: any) {
    try {
      const post = await this.checkPostId(postId.id);
      const alreadyLiked = post.like.includes(userId);
      if (alreadyLiked) {
        throw new HttpException('already liked this post', HttpStatus.CONFLICT);
      }
      await this.prismaService.qrlekhData.update({
        data: {
          like: {
            push: userId,
          },
        },
        where: {
          id: postId.id,
        },
      });
      return { message: 'Post liked successfully' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // add a dis like from a qrlekh data
  async getDisLike(postId: Prisma.QrlekhDataWhereUniqueInput, userId: any) {
    try {
      const post = await this.checkPostId(postId.id);
      const alreadyLiked = post.like.includes(userId);
      if (alreadyLiked) {
        throw new HttpException(
          'already disliked this post',
          HttpStatus.CONFLICT,
        );
      }
      await this.prismaService.qrlekhData.update({
        data: {
          dislike: {
            push: userId,
          },
        },
        where: {
          id: postId.id,
        },
      });
      return { message: 'Post disliked successfully' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // remove a like from a qrlekh data
  async removeLike(postId: Prisma.QrlekhDataWhereUniqueInput, userId: any) {
    try {
      const post = await this.checkPostId(postId.id);
      const alreadyLiked = post.like.includes(userId);
      if (!alreadyLiked) {
        throw new HttpException(
          'You already removed your like from this post',
          HttpStatus.CONFLICT,
        );
      }
      const newLikes = post.like.filter((x) => x !== userId);
      await this.prismaService.qrlekhData.update({
        where: {
          id: postId.id,
        },
        data: {
          like: newLikes,
        },
      });
      return { message: 'Removed like successfully' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // remove a dis like from a qrlekh data
  async removeDisLike(postId: Prisma.QrlekhDataWhereUniqueInput, userId: any) {
    try {
      const post = await this.checkPostId(postId.id);
      const alreadyLiked = post.dislike.includes(userId);
      if (!alreadyLiked) {
        throw new HttpException(
          'You already removed your dislike from this post',
          HttpStatus.CONFLICT,
        );
      }
      const newLikes = post.dislike.filter((x) => x !== userId);
      await this.prismaService.qrlekhData.update({
        where: {
          id: postId.id,
        },
        data: {
          dislike: newLikes,
        },
      });
      return { message: 'Removed dislike successfully' };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async checkPostId(id: number) {
    const post = await this.prismaService.qrlekhData.findUnique({
      where: {
        id,
      },
      include: {
        User: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    if (!post) {
      throw new BadRequestException({ message: `not found ${id}` });
    }
    return post;
  }
  // async deleteData(id: number) {
  //   await this.prismaService.qrlekhData.delete({
  //     where: { id: Number(id) },
  //   });

  //   return { success: true, data: `Delete with id ${id}` };
  // }
}

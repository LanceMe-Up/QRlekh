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
          location: createQr.location,
          visitor: createQr.visitor,
          desc: createQr.desc,
          like: createQr.like,
          userId,
          categoryId,
        },
      });
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

  // add a like from a qrlekh data
  async getSubLike(postId: Prisma.SubQrlekhDataWhereUniqueInput, userId: any) {
    try {
      const post = await this.checkSubPostId(postId.id);
      const alreadyLiked = post.like.includes(userId);
      if (alreadyLiked) {
        throw new HttpException('already liked this post', HttpStatus.CONFLICT);
      }
      await this.prismaService.subQrlekhData.update({
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

  // remove a like from a qrlekh data
  async removeSubLike(
    postId: Prisma.SubQrlekhDataWhereUniqueInput,
    userId: any,
  ) {
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
      await this.prismaService.subQrlekhData.update({
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

  async checkSubPostId(id: number) {
    try {
      const post = await this.prismaService.subQrlekhData.findUnique({
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
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // async deleteData(id: number) {
  //   await this.prismaService.qrlekhData.delete({
  //     where: { id: Number(id) },
  //   });

  //   return { success: true, data: `Delete with id ${id}` };
  // }

  // start sub-child
}

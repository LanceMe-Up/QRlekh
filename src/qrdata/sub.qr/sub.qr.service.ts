import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { SlugifyService } from '../../slugify.service';

@Injectable()
export class SubQrService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slugifyService: SlugifyService,
  ) {}

  async createSubQr(
    createQr: Prisma.SubQrlekhDataCreateInput,
    userId: any,
    qrlekhDataId: any,
  ) {
    try {
      const slug: string = this.slugifyService.toSlug(createQr.title);

      const allSubQr = await this.getSubQr();

      for (const newSubQr of allSubQr.data) {
        if (newSubQr.title === createQr.title) {
          throw new BadRequestException('must be unique title');
        }
      }
      const data = await this.prismaService.subQrlekhData.create({
        data: {
          knownFor: createQr.knownFor,
          title: createQr.title,
          slug,
          visitor: createQr.visitor,
          location: createQr.location,
          isFeature: createQr.isFeature,
          desc: createQr.desc,
          like: createQr.like,
          userId,
          qrlekhDataId,
        },
      });

      return { success: true, message: 'successfully created!', data };
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getSubQr() {
    const data = await this.prismaService.subQrlekhData.findMany({
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
            id: true,
            image: true,
          },
        },
        gallery: {
          select: {
            id: true,
            gallery: true,
          },
        },
        qrReviews: {
          select: {
            id: true,
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
            id: true,
            tagName: true,
          },
        },
        qrBookmark: true,
        favourite: true,
        QrlekhData: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        type: {
          select: {
            type: true,
          },
        },
      },
    });

    return { count: data.length, data };
  }

  async getBySubQrId(id: Prisma.SubQrlekhDataWhereUniqueInput) {
    try {
      const data = this.prismaService.subQrlekhData.findMany({
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
              id: true,
              image: true,
            },
          },
          gallery: {
            select: {
              id: true,
              gallery: true,
            },
          },
          qrReviews: {
            select: {
              id: true,
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
              id: true,
              tagName: true,
            },
          },
          qrBookmark: true,
          favourite: true,
          type: {
            select: {
              id: true,
              type: true,
            },
          },
          QrlekhData: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getBySubQrSlug(slug: string, userId: any) {
    try {
      // for visitors
      await this.prismaService.subQrlekhData.updateMany({
        where: {
          slug: slug,
        },
        data: {
          visitor: {
            push: userId,
          },
        },
      });

      const data = await this.prismaService.subQrlekhData.findMany({
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
              id: true,
              image: true,
            },
          },
          gallery: {
            select: {
              id: true,
              gallery: true,
            },
          },
          qrReviews: {
            select: {
              id: true,
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
              id: true,
              tagName: true,
            },
          },
          qrBookmark: true,
          favourite: true,
          location: {
            select: {
              id: true,
              lat: true,
              long: true,
              name: true,
            },
          },
          type: {
            select: {
              id: true,
              type: true,
            },
          },
          QrlekhData: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // add a like
  async getSubLike(postId: Prisma.SubQrlekhDataWhereUniqueInput, userId: any) {
    try {
      const post = await this.checkSubPostId(postId.id);
      const alreadyLiked = post.like.includes(userId);
      if (alreadyLiked) {
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

  // add a sub qr dislike
  async getSubDisLike(
    postId: Prisma.SubQrlekhDataWhereUniqueInput,
    userId: any,
  ) {
    try {
      const post = await this.checkSubPostId(postId.id);
      const alreadyLiked = post.dislike.includes(userId);
      if (alreadyLiked) {
        const newLikes = post.dislike.filter((x) => x !== userId);
        await this.prismaService.subQrlekhData.update({
          where: {
            id: postId.id,
          },
          data: {
            dislike: newLikes,
          },
        });
        return { message: 'Removed dislike successfully' };
      }
      await this.prismaService.subQrlekhData.update({
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

  // remove a sub qr dislike
  // async removeSubDisLike(
  //   postId: Prisma.SubQrlekhDataWhereUniqueInput,
  //   userId: any,
  // ) {
  //   try {
  //     const post = await this.checkSubPostId(postId.id);
  //     const alreadyLiked = post.dislike.includes(userId);
  //     if (!alreadyLiked) {
  //       throw new HttpException(
  //         'You already removed your like from this post',
  //         HttpStatus.CONFLICT,
  //       );
  //     }
  //     const newLikes = post.dislike.filter((x) => x !== userId);
  //     await this.prismaService.subQrlekhData.update({
  //       where: {
  //         id: postId.id,
  //       },
  //       data: {
  //         dislike: newLikes,
  //       },
  //     });
  //     return { message: 'Removed like successfully' };
  //   } catch (e) {
  //     throw new BadRequestException({ message: e.message });
  //   }
  // }

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

  async recommendationSubQr(userId: any) {
    try {
      const excludedDatawithCount = [];
      const toReturn = [];
      const allData = await this.prismaService.subQrlekhData.findMany();

      for (const data of allData) {
        if (!data.visitor.includes(userId)) {
          excludedDatawithCount.push({
            ...data,
            count: data.like.length + data.dislike.length,
          });
        }
      }

      excludedDatawithCount.sort((a, b) => b.count - a.count);

      for (const item of excludedDatawithCount) {
        const { count, ...res } = item;
        toReturn.push(res);
      }

      return toReturn;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

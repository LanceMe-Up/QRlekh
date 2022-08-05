import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { SlugifyService } from '../slugify.service';

@Injectable()
export class QrdataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slugifyService: SlugifyService,
  ) { }

  async createQr(
    createQr: Prisma.QrlekhDataCreateInput,
    userId: any,
    categoryId: any,
  ) {
    try {
      const allData = await this.get();
      const slug: string = this.slugifyService.toSlug(createQr.title);

      for (const newData of allData.data) {
        if (newData.title === createQr.title) {
          throw new BadRequestException('must be unique title');
        }
        await this.prismaService.qrlekhData.create({
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
        return { success: true, message: 'successfully created!' };
      }


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
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
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
        location: {
          select: {
            lat: true,
            long: true,
            name: true,
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
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
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
          subQrlekh: true,
          type: {
            select: {
              id: true,
              type: true,
            },
          },
          location: {
            select: {
              id: true,
              lat: true,
              long: true,
              name: true,
            },
          },
        },
      });
      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async getBySlug(slug: string, userId: any) {
    try {
      // for visitors
      await this.prismaService.qrlekhData.updateMany({
        where: {
          slug: slug,
        },
        data: {
          visitor: {
            push: userId,
          }
        },
      });

      // for slug
      const data = await this.prismaService.qrlekhData.findMany({
        where: {
          slug,
        },
        include: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
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
              id: true,
            },
          },
          gallery: {
            select: {
              gallery: true,
              id: true,
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
              id: true,
            },
          },
          qrBookmark: true,
          favourite: true,
          subQrlekh: true,
          type: {
            select: {
              type: true,
              id: true,
            },
          },
          location: {
            select: {
              id: true,
              lat: true,
              long: true,
              name: true,
            },
          },
        },
      });

      return data;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  // // add a visitor from a qrlekh data
  // async getVisitor(postId: Prisma.QrlekhDataWhereUniqueInput, userId: any) {
  //   try {
  //     await this.prismaService.qrlekhData.update({
  //       data: {
  //         visitor: {
  //           push: userId,
  //         },
  //       },
  //       where: {
  //         id: postId.id,
  //       },
  //     });
  //     return { message: 'visitor added' };
  //   } catch (e) {
  //     throw new BadRequestException({ message: e.message });
  //   }
  // }

  // add a like from a qrlekh data
  async getLike(postId: Prisma.QrlekhDataWhereUniqueInput, userId: any) {
    try {
      const post = await this.checkPostId(postId.id);
      const alreadyLiked = post.like.includes(userId);

      if (alreadyLiked) {
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
      const alreadyDisLiked = post.dislike.includes(userId);
      if (alreadyDisLiked) {
        const newDisLikes = post.dislike.filter((x) => x !== userId);
        await this.prismaService.qrlekhData.update({
          where: {
            id: postId.id,
          },
          data: {
            dislike: newDisLikes,
          },
        });
        return { message: 'Removed disliked successfully' };
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

  async checkPostSlug(id: number) {
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

  async recommendation(userId: any) {
    try {
      const excludedDatawithCount = [];
      const toReturn = [];
      const allData = await this.prismaService.qrlekhData.findMany();

      for (const data of allData) {

        if (!data.visitor.includes(userId)) {
          excludedDatawithCount.push({ ...data, count: data.like.length + data.dislike.length })
        }
      }

      excludedDatawithCount.sort((a, b) => b.count - a.count)

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

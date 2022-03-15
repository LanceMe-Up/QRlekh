import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { OtpType } from '@prisma/client';

@Injectable()
export class OtpService {
  constructor(private prisma: PrismaService) {}

  async createOtp(userId: number, otpType: OtpType) {
    // TODO: Generate a random 6 digit OTP code everytime
    const randomCode = '111111';

    return this.prisma.otp.create({
      data: {
        code: randomCode,
        type: otpType,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async validateOtp(userId: number, code: string, otpType: OtpType) {
    const otpEntry = await this.prisma.otp.findFirst({
      where: {
        code,
        userId,
        type: otpType,
      },
    });
    if (!otpEntry) throw new NotFoundException('Invalid OTP');

    if (otpEntry.createdAt.getTime() + 1000 * 60 * 15 < Date.now()) {
      throw new BadRequestException('OTP has expired!');
    }

    return true;
  }
}

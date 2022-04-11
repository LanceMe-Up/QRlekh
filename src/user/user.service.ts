import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { OtpType, Prisma } from '@prisma/client';

import { hashSync, hash } from 'bcrypt';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private otpService: OtpService) {}

  async getUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  async createUser(data: Prisma.UserCreateInput) {
    const userInfo = { ...data };
    userInfo.password = hashSync(data.password, 3);

    return this.prisma.user.create({
      data: userInfo,
    });
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    const newData = { ...data };
    // Hashing the password if it is changed
    if (data.password) newData.password = hashSync(data.password as string, 3);
    // Saving the data
    return this.prisma.user.update({ where, data: newData });
  }

  async initiateResetPassword(email: string) {
    // Checking if user exists or not
    const user = await this.getUser({ email });
    if (!user) throw new NotFoundException("User doesn't exists!");

    // Creating a OTP for the user
    await this.otpService.createOtp(user.id, OtpType.PASSWORD_RESET);

    // TODO:: Send mail with OTP
    return this.updateUser(
      {
        id: user.id,
      },
      {
        passwordResetRequested: true,
      },
    );
  }

  async finalizeResetPassword(
    email: string,
    code: string,
    newPassword: string,
  ) {
    // Checking if user exists or not
    const user = await this.getUser({ email });
    if (!user) throw new NotFoundException("User doesn't exists!");

    // Checking if the OTP provided by user is valid or not
    const isValid = await this.otpService.validateOtp(
      user.id,
      code,
      OtpType.PASSWORD_RESET,
    );
    if (!isValid) throw new BadRequestException('Invalid OTP');

    // Updating the user's password
    return this.updateUser(
      {
        id: user.id,
      },
      {
        passwordResetRequested: false,
        password: hashSync(newPassword, 3),
      },
    );
  }

  async updateRefreshTokenById(refreshToken: string, id: string) {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: {
        refreshToken: refreshToken ? await hash(refreshToken, 10) : null,
      },
    });
  }
}

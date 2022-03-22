/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';

import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser({ email });
    if (!user)
      throw new UnauthorizedException({
        statusCode: 404,
        message: 'User is not yet registered!',
      });

    const valid = await compare(password, user.password);
    if (!valid)
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid email/password!',
      });

    return user;
  }

  login(user: any) {
    const payload = { email: user.email, role: user.role, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(userDetail: CreateUserDto) {
    const user = await this.userService.getUser({ email: userDetail.email });
    if (user)
      throw new BadRequestException({
        statusCode: 400,
        message: 'Email already exists!',
      });

    return await this.userService.createUser({
      username: userDetail.username,
      email: userDetail.email,
      password: userDetail.password,
      phone: userDetail.phone,
      role: userDetail.role,
    });
  }

  async resetUserPassword(email: string) {
    await this.userService.initiateResetPassword(email);

    return { message: 'OTP has been sent to your email!' };
  }

  async finalizeResetPassword(email: string, otp: string, password: string) {
    await this.userService.finalizeResetPassword(email, otp, password);

    return { message: 'Password has been reset successfully!' };
  }
}

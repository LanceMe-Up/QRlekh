import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard } from '../@guards/local.guard';
import { AuthService } from './auth.service';

import {
  InitiateResetPasswordDto,
  FinalizeResetPasswordDto,
} from '../auth/dto/resetPassword.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() input: CreateUserDto) {
    return await this.authService.register(input);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('reset-password')
  async ResetPassword(@Body() input: InitiateResetPasswordDto) {
    return this.authService.resetUserPassword(input.email);
  }

  @Patch('reset-password')
  async ResetPasswordOTP(@Body() input: FinalizeResetPasswordDto) {
    return this.authService.finalizeResetPassword(
      input.email,
      input.code,
      input.password,
    );
  }
}

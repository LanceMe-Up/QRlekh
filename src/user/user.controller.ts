import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../@guards/jwt.guard';

import { UserService } from './user.service';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser({ id: Number(id) });
    if (!user) throw new NotFoundException("User doesn't exists!");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeDetails } = user;
    console.log(`${user.password} ${user.email}`);
    return safeDetails;
  }
}

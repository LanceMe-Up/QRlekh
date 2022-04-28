import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { JwtAuthGuard } from '../@guards/jwt.guard';
import { imageFileFilter, validateFileName } from '../photo-validate';

import { UserService } from './user.service';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Request() req: any) {
    const user = await this.userService.getUser({ id: req.user.id });
    if (!user) throw new NotFoundException("User doesn't exists!");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeDetails } = user;
    console.log(`${user.password} ${user.email}`);
    return safeDetails;
  }

  @Post('/profile')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
    const image = `${process.env.HOST}/static/upload/${file.filename}`;
    return await this.userService.setProfile(image, req.user.id);
  }

  @Patch('/update-profile/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: validateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
    @Param('id') id: number,
  ) {
    const image = `${process.env.HOST}/static/upload/${file.filename}`;
    return await this.userService.updateProfile(image, id);
  }
}

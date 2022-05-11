import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Request,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { Roles } from '../roles.decorates';
import { QrDto } from './dto/qr.dto';
import { QrdataService } from './qrdata.service';

@Controller('qrlekh')
@ApiTags('qrlekh')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrdataController {
  constructor(private readonly qrService: QrdataService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  create(@Body() data: QrDto, @Request() req: any) {
    return this.qrService.createQr(data, req.user.id, data.categoryId);
  }

  @Get()
  async get() {
    return await this.qrService.get();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.qrService.getById({ id: Number(id) });
  }

  @Get('/:slug/data')
  getSlug(@Param('slug') slug: string) {
    return this.qrService.getBySlug(slug);
  }

  @Patch('/:id/likes')
  countLike(@Param('id') id: string, @Request() req: any) {
    return this.qrService.getLike({ id: Number(id) }, req.user.id);
  }

  // remove a Like to a Post
  @Delete(':id/likes')
  removeLike(@Request() req: any, @Param('id') id: string) {
    return this.qrService.removeLike({ id: Number(id) }, req.user.id);
  }

  // like a sub child Like to a Post
  @Patch('/:id/sub-likes')
  countsubLike(@Param('id') id: string, @Request() req: any) {
    return this.qrService.getSubLike({ id: Number(id) }, req.user.id);
  }

  // remove a sub child Like to a Post
  @Delete('/:id/sub-likes/remove')
  @UseGuards(JwtAuthGuard)
  removesubLike(@Request() req: any, @Param('id') id: string) {
    return this.qrService.removeSubLike({ id: Number(id) }, req.user.id);
  }

  // @Delete(':id')
  // @UseGuards(RolesGuard)
  // @Roles(UserRole.ADMIN)
  // async deleteData(@Param('id') id: number) {
  //   return await this.qrService.deleteData(id);
  // }
}

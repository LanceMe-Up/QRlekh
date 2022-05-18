import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../../@guards/jwt.guard';
import { RolesGuard } from '../../@guards/roles.guard';
import { Roles } from '../../roles.decorates';
import { SubQrDto } from '../dto/sub.qr.dto';
import { SubQrService } from './sub.qr.service';

@Controller('sub-qrlekh')
@ApiTags('sub-qrlekh')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SubQrController {
  constructor(private readonly qrService: SubQrService) {}

  @Get('/:id')
  getBySubQrlekhId(@Param('id') id: string) {
    return this.qrService.getBySubQrId({ id: Number(id) });
  }

  @Get('/:slug/data')
  getSubQrlekhSlug(@Param('slug') slug: string) {
    return this.qrService.getBySubQrSlug(slug);
  }

  @Get()
  async getSub() {
    return await this.qrService.getSubQr();
  }
  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN || UserRole.SUPERADMIN)
  createSub(@Body() data: SubQrDto, @Request() req: any) {
    return this.qrService.createSubQr(data, req.user.id, data.qrlekhDataId);
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

  @Patch('/:id/sub-dislikes')
  countdisLike(@Param('id') id: string, @Request() req: any) {
    return this.qrService.getSubDisLike({ id: Number(id) }, req.user.id);
  }

  // remove a Like to a Post
  @Delete(':id/sub-dislikes/remove')
  removeLike(@Request() req: any, @Param('id') id: string) {
    return this.qrService.removeSubDisLike({ id: Number(id) }, req.user.id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../../@guards/jwt.guard';
import { RolesGuard } from '../../@guards/roles.guard';
import { Roles } from '../../roles.decorates';
import {
  CreateQrBookmarkDto,
  CreateSubQrBookmarkDto,
} from '../dto/bookmark.dto';
import { QrBookmarkService } from './qr.bookmark.service';

@Controller('qrlekh-bookmark')
@ApiTags('qrlekh-bookmark')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrBookmarkController {
  constructor(private readonly qrService: QrBookmarkService) {}

  @Get()
  getBookmark() {
    return this.qrService.getBookmark();
  }

  @Post('/qr-lekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  createQrBookmark(@Body() data: CreateQrBookmarkDto, @Request() req: any) {
    return this.qrService.createQrBookmark(data, data.qrlekhId, req.user.id);
  }

  @Post('/sub-qr-lekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  createSubQrBookmark(
    @Body() data: CreateSubQrBookmarkDto,
    @Request() req: any,
  ) {
    return this.qrService.createSubQrBookmark(
      data,
      data.subQrlekhId,
      req.user.id,
    );
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  updateQrBookmark(@Param('id') id: string, @Body() data: CreateQrBookmarkDto) {
    return this.qrService.updateQrBookmark(+id, data, data.qrlekhId);
  }
}

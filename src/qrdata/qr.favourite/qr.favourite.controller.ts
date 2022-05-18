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
  CreateQrFavouriteDto,
  CreateSubQrFavouriteDto,
} from '../dto/favourite.dto';
import { QrFavouriteService } from './qr.favourite.service';

@Controller('qrlekh-favourite')
@ApiTags('qrlekh-favourite')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrFavouriteController {
  constructor(private readonly qrService: QrFavouriteService) {}

  @Get()
  getFavourite() {
    return this.qrService.getFavourite();
  }

  @Get('/show-favourite')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.USER)
  showUserBookmark(@Request() req: any) {
    return this.qrService.findUserFavourite(req.user.id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  createQrFavourite(@Body() data: CreateQrFavouriteDto, @Request() req: any) {
    return this.qrService.createQrFavourite(data, data.qrlekhId, req.user.id);
  }

  @Post('/sub/qrlekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  createSubQrFavourite(
    @Body() data: CreateSubQrFavouriteDto,
    @Request() req: any,
  ) {
    return this.qrService.createSubQrFavourite(
      data,
      data.subQrfavId,
      req.user.id,
    );
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  updateFavourite(@Param('id') id: string, @Body() data: CreateQrFavouriteDto) {
    return this.qrService.updateQrFavourite(+id, data, data.qrlekhId);
  }
}

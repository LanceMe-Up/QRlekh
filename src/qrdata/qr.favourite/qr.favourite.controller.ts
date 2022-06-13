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
  UpdateQrFavouriteDto,
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
    return this.qrService.createQrFavourite(+data.qrlekhId, req.user.id);
  }

  @Post('/sub/qrlekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  createSubQrFavourite(
    @Body() data: CreateSubQrFavouriteDto,
    @Request() req: any,
  ) {
    return this.qrService.createSubQrFavourite(data.subQrfavId, req.user.id);
  }

  // @Patch('/:id/update-qr')
  // @UseGuards(RolesGuard)
  // @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  // updateFavourite(
  //   @Param('id') id: string,
  //   @Request() req: any,
  //   @Body() data: UpdateQrFavouriteDto,
  // ) {
  //   return this.qrService.updateQrFavourite(+id, req.user.id, data);
  // }

  @Patch('/:id/test/favourite')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  updateUpsertFavourite(
    @Param('id') id: string,
    @Request() req: any,
    @Body() data: UpdateQrFavouriteDto,
  ) {
    return this.qrService.updateUpSertQrFavourite(
      +id,
      req.user.id,
      data.qrlekhId,
    );
  }
}

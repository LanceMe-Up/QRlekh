import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { Roles } from '../roles.decorates';
import { QrDto } from './dto/qr.dto';

import { QrdataService } from './qrdata.service';

@Controller('qrdata')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrdataController {
  constructor(private readonly qrService: QrdataService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() data: QrDto, @Request() req: any) {
    console.log(data);
    console.log(req.user.id);
    return this.qrService.createQr(data, req.user.id, data.tagNameId);
  }

  @Get()
  async get() {
    return await this.qrService.get();
  }

  @Get('/:slug/data')
  getSlug(@Param('slug') slug: string) {
    return this.qrService.getBySlug(slug);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteData(@Param('id') id: number) {
    return await this.qrService.deleteData(id);
  }
}

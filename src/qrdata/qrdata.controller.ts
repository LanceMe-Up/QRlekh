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
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { QrDto } from './dto/qr.dto';

import { QrdataService } from './qrdata.service';

@Controller('qrdata')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrdataController {
  constructor(private readonly qrService: QrdataService) {}

  @Post()
  async create(@Body() createDto: QrDto, @Request() req: any) {
    try {
      return await this.qrService.createQr(
        { ...createDto },
        req.user.id,
        +createDto.tagNameId,
      );
    } catch (e) {
      return { log: e.message };
    }
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
  async deleteData(@Param('id') id: number) {
    return await this.qrService.deleteData(id);
  }
}

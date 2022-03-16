import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
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
    return await this.qrService.createQr(
      { ...createDto },
      req.user.id,
      +createDto.tagNameId,
    );
  }

  @Get()
  async get() {
    return await this.qrService.get();
  }

  @Delete(':id')
  async deleteData(@Param('id') id: number) {
    return await this.qrService.deleteData(id);
  }
}

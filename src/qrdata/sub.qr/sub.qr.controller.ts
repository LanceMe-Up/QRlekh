import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
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
  getByQrlekhId(@Param('id') id: string) {
    return this.qrService.getBySubQrId({ id: Number(id) });
  }

  @Get('/:slug/data')
  getQrlekhSlug(@Param('slug') slug: string) {
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
}

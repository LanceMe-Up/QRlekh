import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../../@guards/jwt.guard';
import { RolesGuard } from '../../@guards/roles.guard';
import { Roles } from '../../roles.decorates';
import { CreateQrTypeDto, CreateSubQrTypeDto } from './dto/create.qr.type.dto';
import { QrTypeService } from './qrtype.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('qr-type')
@Controller('qr-type')
export class ListTourController {
  constructor(private qrtypeService: QrTypeService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post()
  async create(@Body() data: CreateQrTypeDto) {
    return await this.qrtypeService.createQrType(data, +data.qrlekhId);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post('sub-qrlekh')
  async createSub(@Body() data: CreateSubQrTypeDto) {
    return await this.qrtypeService.createSubQrType(data, +data.subQrlekhId);
  }

  @Get()
  get() {
    return this.qrtypeService.getQrType();
  }
}

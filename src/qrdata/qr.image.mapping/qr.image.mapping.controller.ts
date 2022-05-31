import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../../@guards/jwt.guard';
import { RolesGuard } from '../../@guards/roles.guard';
import { Roles } from '../../roles.decorates';
import {
  CreateQrImageMappingDto,
  UpdateQrImageMappingDto,
} from './dto/create.image.mapping.dto';
import { QrImageMappingService } from './qr.image.mapping.service';

@ApiTags('image-mapping')
@Controller('image-mapping')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QrImageMappingController {
  constructor(private readonly imageMapping: QrImageMappingService) {}

  @Get()
  get() {
    return this.imageMapping.getAllImageMapping();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  create(@Body() data: CreateQrImageMappingDto) {
    return this.imageMapping.createImageMapping(data, data.qrMappingId);
  }

  @Patch('/:id/update-data')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  update(@Body() data: UpdateQrImageMappingDto, @Param('id') id: number) {
    return this.imageMapping.updateImageMapping(data, { id: id });
  }

  @Delete('/:id/delete-data')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  delete(@Param('id') id: number) {
    return this.imageMapping.deleteImageMapping({ id: id });
  }
}

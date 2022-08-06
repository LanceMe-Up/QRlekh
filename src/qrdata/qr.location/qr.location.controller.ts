import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../../@guards/jwt.guard';
import { RolesGuard } from '../../@guards/roles.guard';
import { Roles } from '../../roles.decorates';
import {
  CreateQrLocationDto,
  CreateSubQrLocationDto,
  GetLocationDto,
  UpdateSubQrLocationDto,
} from './dto/create.location.dto';
import { QrLocationService } from './qr.location.service';

@Controller('qrlekh-location')
@ApiTags('qrlekh-location')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QrLocationController {
  constructor(private readonly qrService: QrLocationService) {}

  @Get()
  getFavourite() {
    return this.qrService.getLocation();
  }

  @Get('/near')
  getNearDistrict(
    @Query('skip') skip: string,
    @Query('limit') limit: string,
    @Query('lat') lat: number,
    @Query('long') long: number,
  ) {
    return this.qrService.getNearDistrict({
      lat: Number(lat),
      long: Number(long),
      skip: Number(skip),
      limit: Number(limit) || 7,
    });
  }

  @Get('/nearby')
  findAllByRadius(
    @Query()
    getLocationProjectDto: GetLocationDto,
  ) {
    // const ip = req.clientIp;
    // getLocationProjectDto.ip_address = ip;
    return this.qrService.findAllByRadius(getLocationProjectDto);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  createQrFavourite(@Body() data: CreateQrLocationDto) {
    return this.qrService.createQrLekhLocation(data, data.qrlekhId);
  }

  @Post('/sub/qrlekh')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  createSubQrFavourite(@Body() data: CreateSubQrLocationDto) {
    return this.qrService.createSubQrLekhLocation(data, data.subqrId);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
  updateFavourite(
    @Param('id') id: string,
    @Body() data: UpdateSubQrLocationDto,
  ) {
    return this.qrService.updateQrLocation(+id, data);
  }
}

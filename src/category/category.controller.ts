import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../@guards/jwt.guard';
import { RolesGuard } from '../@guards/roles.guard';
import { Roles } from '../roles.decorates';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';

@ApiTags('category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly category: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() data: CreateCategoryDto, @Request() req: any) {
    return this.category.createCategory(data, req.user.id);
  }

  @Get()
  get() {
    return this.category.getCategory();
  }
}

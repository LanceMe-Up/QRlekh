import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../@guards/jwt.guard';
import {
  CreateQrReviewsDto,
  CreateSubQrReviewsDto,
} from './dto/create.qr.review.dto';
import { QrReviewService } from './qr.reviews.service';

@ApiTags('review')
@Controller('review')
export class TourReviewController {
  constructor(private readonly reviewService: QrReviewService) {}

  @Get()
  get() {
    return this.reviewService.getReview();
  }

  @Post('/qrlekh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() data: CreateQrReviewsDto, @Request() req: any) {
    return this.reviewService.createReview(data, req.user.id, data.qrlekhId);
  }

  @Post('/sub-qrlekh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createSubQr(@Body() data: CreateSubQrReviewsDto, @Request() req: any) {
    return this.reviewService.createSubReview(
      data,
      req.user.id,
      data.subQrlekhDataId,
    );
  }
}

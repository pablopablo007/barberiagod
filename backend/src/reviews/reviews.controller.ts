import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('reviews')
@Controller('reviews')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReviewsController {
    constructor(private srv: ReviewsService) { }

    @Post()
    create(@CurrentUser() u: any, @Body() dto: CreateReviewDto) {
        return this.srv.create(u.id, dto);
    }

    @Get()
    findByBarber(@Query('barberId') barberId: string) {
        return this.srv.findByBarber(barberId);
    }
}

import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/promotion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('promotions')
@Controller('promotions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PromotionsController {
    constructor(private srv: PromotionsService) { }

    @Get()
    @Roles('OWNER')
    findAll(@CurrentUser() u: any) {
        return this.srv.findAll(u.tenantId);
    }

    @Post()
    @Roles('OWNER')
    create(@CurrentUser() u: any, @Body() dto: CreatePromotionDto) {
        return this.srv.create(u.tenantId, dto);
    }

    @Patch(':id/toggle')
    @Roles('OWNER')
    toggle(@Param('id') id: string, @CurrentUser() u: any, @Body('isActive') isActive: boolean) {
        return this.srv.toggleActive(id, u.tenantId, isActive);
    }

    @Get('validate/:code')
    // Clients and Barbers can validate
    validate(@Param('code') code: string, @CurrentUser() u: any) {
        return this.srv.validateCode(code, u.tenantId);
    }
}

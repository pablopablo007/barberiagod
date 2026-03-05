import {
    Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BarbersService } from './barbers.service';
import { CreateBarberDto, UpdateBarberDto } from './dto/barber.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('barbers')
@Controller('barbers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BarbersController {
    constructor(private srv: BarbersService) { }

    @Get()
    findAll(@CurrentUser() u: any) { return this.srv.findAll(u.tenantId); }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser() u: any) {
        return this.srv.findOne(id, u.tenantId);
    }

    @Get(':id/availability')
    getAvailability(
        @Param('id') id: string,
        @CurrentUser() u: any,
        @Query('date') date: string,
    ) {
        return this.srv.getAvailability(id, u.tenantId, date);
    }

    @Post()
    create(@CurrentUser() u: any, @Body() dto: CreateBarberDto) {
        return this.srv.create(u.tenantId, dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @CurrentUser() u: any, @Body() dto: UpdateBarberDto) {
        return this.srv.update(id, u.tenantId, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() u: any) {
        return this.srv.remove(id, u.tenantId);
    }
}

import {
    Controller, Get, Post, Patch, Delete, Body, Param, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AppointmentsController {
    constructor(private srv: AppointmentsService) { }

    @Get()
    findAll(@CurrentUser() u: any) {
        return this.srv.findAll(u.tenantId, u.id, u.role);
    }

    @Post()
    create(@CurrentUser() u: any, @Body() dto: CreateAppointmentDto) {
        return this.srv.create(u.tenantId, u.id, dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @CurrentUser() u: any, @Body() dto: UpdateAppointmentDto) {
        return this.srv.update(id, u.tenantId, dto);
    }

    @Delete(':id')
    cancel(@Param('id') id: string, @CurrentUser() u: any) {
        return this.srv.cancel(id, u.tenantId);
    }
}

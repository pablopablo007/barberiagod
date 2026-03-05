import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BarberPhotosService } from './barber-photos.service';
import { CreateBarberPhotoDto } from './dto/barber-photo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('barber-photos')
@Controller('barber-photos')
export class BarberPhotosController {
    constructor(private srv: BarberPhotosService) { }

    @Get(':barberId')
    // Public endpoint (so clients can see the portfolio)
    findByBarber(@Param('barberId') barberId: string) {
        return this.srv.findByBarber(barberId);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles('OWNER', 'BARBER')
    create(@CurrentUser() u: any, @Body() dto: CreateBarberPhotoDto) {
        return this.srv.create(u.id, u.role, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles('OWNER', 'BARBER')
    remove(@Param('id') id: string, @CurrentUser() u: any) {
        return this.srv.remove(id, u.id, u.role);
    }
}

import {
    Controller, Get, Post, Patch, Delete, Body, Param, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('services')
@Controller('services')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ServicesController {
    constructor(private srv: ServicesService) { }

    @Get()
    findAll(@CurrentUser() u: any) { return this.srv.findAll(u.tenantId); }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser() u: any) {
        return this.srv.findOne(id, u.tenantId);
    }

    @Post()
    create(@CurrentUser() u: any, @Body() dto: CreateServiceDto) {
        return this.srv.create(u.tenantId, dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @CurrentUser() u: any, @Body() dto: UpdateServiceDto) {
        return this.srv.update(id, u.tenantId, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() u: any) {
        return this.srv.remove(id, u.tenantId);
    }
}

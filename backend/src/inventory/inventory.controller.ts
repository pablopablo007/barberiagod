import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/inventory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class InventoryController {
    constructor(private srv: InventoryService) { }

    @Get()
    @Roles('OWNER', 'BARBER') // Barberos también pueden ver stock para vender
    findAll(@CurrentUser() u: any) {
        return this.srv.findAll(u.tenantId);
    }

    @Post()
    @Roles('OWNER')
    create(@CurrentUser() u: any, @Body() dto: CreateInventoryDto) {
        return this.srv.create(u.tenantId, dto);
    }

    @Patch(':id/adjust')
    @Roles('OWNER', 'BARBER') // Barbero puede descontar stock si vende un producto
    adjust(@Param('id') id: string, @CurrentUser() u: any, @Body('qty') qty: number) {
        return this.srv.updateQuantity(id, u.tenantId, qty);
    }

    @Delete(':id')
    @Roles('OWNER')
    remove(@Param('id') id: string, @CurrentUser() u: any) {
        return this.srv.remove(id, u.tenantId);
    }
}

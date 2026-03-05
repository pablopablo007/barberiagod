import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
    constructor(private prisma: PrismaService) { }

    findAll(tenantId: string) {
        return this.prisma.inventory.findMany({ where: { tenantId } });
    }

    async create(tenantId: string, dto: CreateInventoryDto) {
        return this.prisma.inventory.create({ data: { ...dto, tenantId } });
    }

    async updateQuantity(id: string, tenantId: string, adjustment: number) {
        const item = await this.prisma.inventory.findFirst({ where: { id, tenantId } });
        if (!item) throw new NotFoundException('Producto no encontrado');

        const newQuant = Math.max(0, item.quantity + adjustment);
        return this.prisma.inventory.update({
            where: { id },
            data: { quantity: newQuant },
        });
    }

    async remove(id: string, tenantId: string) {
        const item = await this.prisma.inventory.findFirst({ where: { id, tenantId } });
        if (!item) throw new NotFoundException('Producto no encontrado');
        return this.prisma.inventory.delete({ where: { id } });
    }
}

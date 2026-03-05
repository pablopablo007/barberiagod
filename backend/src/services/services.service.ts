import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) { }

    findAll(tenantId: string) {
        return this.prisma.service.findMany({ where: { tenantId } });
    }

    findOne(id: string, tenantId: string) {
        return this.prisma.service.findFirst({ where: { id, tenantId } });
    }

    create(tenantId: string, dto: CreateServiceDto) {
        return this.prisma.service.create({ data: { ...dto, tenantId } });
    }

    async update(id: string, tenantId: string, dto: UpdateServiceDto) {
        await this.findOneOrFail(id, tenantId);
        return this.prisma.service.update({ where: { id }, data: dto });
    }

    async remove(id: string, tenantId: string) {
        await this.findOneOrFail(id, tenantId);
        return this.prisma.service.delete({ where: { id } });
    }

    private async findOneOrFail(id: string, tenantId: string) {
        const s = await this.prisma.service.findFirst({ where: { id, tenantId } });
        if (!s) throw new NotFoundException('Servicio no encontrado');
        return s;
    }
}

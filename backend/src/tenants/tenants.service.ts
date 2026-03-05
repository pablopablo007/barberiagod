import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
    constructor(private prisma: PrismaService) { }

    async getMyTenant(tenantId: string) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id: tenantId },
        });
        if (!tenant) throw new NotFoundException('Barbería no encontrada');
        return tenant;
    }

    async update(tenantId: string, dto: UpdateTenantDto) {
        return this.prisma.tenant.update({
            where: { id: tenantId },
            data: dto,
        });
    }

    async getPublicBySlug(slug: string) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { slug },
            include: {
                services: { where: { isActive: true } },
                barbers: {
                    include: { user: { select: { name: true, avatarUrl: true } } },
                },
            },
        });
        if (!tenant) throw new NotFoundException('Barbería no encontrada');
        return tenant;
    }
}

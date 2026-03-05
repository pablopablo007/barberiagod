import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromotionDto } from './dto/promotion.dto';

@Injectable()
export class PromotionsService {
    constructor(private prisma: PrismaService) { }

    findAll(tenantId: string) {
        return this.prisma.promotion.findMany({ where: { tenantId } });
    }

    async validateCode(code: string, tenantId: string) {
        const promo = await this.prisma.promotion.findFirst({
            where: { code, tenantId, isActive: true },
        });
        if (!promo || promo.validUntil < new Date()) {
            throw new NotFoundException('Código de promoción inválido o expirado');
        }
        return promo;
    }

    async create(tenantId: string, dto: CreatePromotionDto) {
        return this.prisma.promotion.create({
            data: {
                ...dto,
                tenantId,
                validUntil: new Date(dto.validUntil),
            },
        });
    }

    async toggleActive(id: string, tenantId: string, isActive: boolean) {
        const promo = await this.prisma.promotion.findFirst({ where: { id, tenantId } });
        if (!promo) throw new NotFoundException('Promoción no encontrada');
        return this.prisma.promotion.update({ where: { id }, data: { isActive } });
    }
}

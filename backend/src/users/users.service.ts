import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    findAll(tenantId: string) {
        return this.prisma.user.findMany({
            where: { tenantId },
            select: { id: true, name: true, email: true, role: true, phone: true, avatarUrl: true, createdAt: true },
        });
    }

    findOne(id: string, tenantId: string) {
        return this.prisma.user.findFirst({
            where: { id, tenantId },
            select: { id: true, name: true, email: true, role: true, phone: true, avatarUrl: true },
        });
    }
}

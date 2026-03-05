import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { addMinutes } from 'date-fns';

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) { }

    findAll(tenantId: string, userId: string, role: string) {
        const where: any = { tenantId };
        if (role === 'CLIENT') where.clientId = userId;
        if (role === 'BARBER') {
            // find barber profile
        }
        return this.prisma.appointment.findMany({
            where,
            include: {
                client: { select: { name: true, email: true, phone: true } },
                barber: { include: { user: { select: { name: true } } } },
                service: true,
                payment: true,
            },
            orderBy: { startAt: 'asc' },
        });
    }

    async create(tenantId: string, clientId: string, dto: CreateAppointmentDto) {
        const service = await this.prisma.service.findFirst({
            where: { id: dto.serviceId, tenantId },
        });
        if (!service) throw new NotFoundException('Servicio no encontrado');

        const startAt = new Date(dto.startAt);
        const endAt = addMinutes(startAt, service.durationMinutes);

        // Conflict check
        const conflict = await this.prisma.appointment.findFirst({
            where: {
                barberId: dto.barberId,
                status: { not: 'CANCELLED' },
                OR: [
                    { startAt: { lt: endAt }, endAt: { gt: startAt } },
                ],
            },
        });
        if (conflict) throw new BadRequestException('El barbero no está disponible en ese horario');

        return this.prisma.appointment.create({
            data: {
                tenantId,
                clientId,
                barberId: dto.barberId,
                serviceId: dto.serviceId,
                startAt,
                endAt,
                notes: dto.notes,
            },
            include: { service: true, barber: { include: { user: true } } },
        });
    }

    async update(id: string, tenantId: string, dto: UpdateAppointmentDto) {
        const appt = await this.prisma.appointment.findFirst({ where: { id, tenantId } });
        if (!appt) throw new NotFoundException('Cita no encontrada');
        return this.prisma.appointment.update({ where: { id }, data: dto });
    }

    async cancel(id: string, tenantId: string) {
        const appt = await this.prisma.appointment.findFirst({ where: { id, tenantId } });
        if (!appt) throw new NotFoundException('Cita no encontrada');
        return this.prisma.appointment.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
}

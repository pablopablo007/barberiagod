import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    async createPayment(appointmentId: string, tenantId: string, method: string) {
        const appt = await this.prisma.appointment.findFirst({
            where: { id: appointmentId, tenantId },
            include: { service: true },
        });
        if (!appt) throw new NotFoundException('Cita no encontrada');

        return this.prisma.payment.upsert({
            where: { appointmentId },
            create: {
                appointmentId,
                amount: appt.service.price,
                method: method as any,
                status: 'PENDING',
            },
            update: { method: method as any },
        });
    }

    async markPaid(appointmentId: string, tenantId: string) {
        const appt = await this.prisma.appointment.findFirst({
            where: { id: appointmentId, tenantId },
        });
        if (!appt) throw new NotFoundException('Cita no encontrada');

        const payment = await this.prisma.payment.findUnique({ where: { appointmentId } });
        if (!payment) throw new NotFoundException('Pago no encontrado');

        return this.prisma.payment.update({
            where: { appointmentId },
            data: { status: 'PAID' },
        });
    }
}

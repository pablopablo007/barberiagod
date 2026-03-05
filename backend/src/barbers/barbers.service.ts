import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarberDto, UpdateBarberDto } from './dto/barber.dto';
import { addMinutes } from 'date-fns';

@Injectable()
export class BarbersService {
    constructor(private prisma: PrismaService) { }

    findAll(tenantId: string) {
        return this.prisma.barber.findMany({
            where: { tenantId },
            include: { user: { select: { name: true, email: true, avatarUrl: true, phone: true } } },
        });
    }

    async findOne(id: string, tenantId: string) {
        const b = await this.prisma.barber.findFirst({
            where: { id, tenantId },
            include: { user: { select: { name: true, email: true, avatarUrl: true } } },
        });
        if (!b) throw new NotFoundException('Barbero no encontrado');
        return b;
    }

    async create(tenantId: string, dto: CreateBarberDto) {
        return this.prisma.barber.create({
            data: { userId: dto.userId, tenantId, bio: dto.bio, schedule: dto.schedule },
        });
    }

    async update(id: string, tenantId: string, dto: UpdateBarberDto) {
        await this.findOne(id, tenantId);
        return this.prisma.barber.update({ where: { id }, data: dto });
    }

    async remove(id: string, tenantId: string) {
        await this.findOne(id, tenantId);
        return this.prisma.barber.delete({ where: { id } });
    }

    /** Returns 30-min slots available for a barber on a given date */
    async getAvailability(barberId: string, tenantId: string, date: string) {
        const barber = await this.findOne(barberId, tenantId);
        const dayKey = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();

        const schedule: any = barber.schedule || {};
        const daySlots: { start: string; end: string }[] = schedule[dayKey] || [];

        const existingAppointments = await this.prisma.appointment.findMany({
            where: {
                barberId,
                startAt: { gte: new Date(date + 'T00:00:00'), lte: new Date(date + 'T23:59:59') },
                status: { not: 'CANCELLED' },
            },
        });

        const busyTimes = existingAppointments.map((a) => ({
            start: a.startAt.toISOString(),
            end: a.endAt.toISOString(),
        }));

        const available: string[] = [];
        for (const slot of daySlots) {
            const [sh, sm] = slot.start.split(':').map(Number);
            const [eh, em] = slot.end.split(':').map(Number);
            const startDt = new Date(`${date}T${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}:00`);
            const endDt = new Date(`${date}T${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}:00`);

            let cur = startDt;
            while (cur < endDt) {
                const slotEnd = addMinutes(cur, 30);
                const isBusy = busyTimes.some(
                    (b) => new Date(b.start) < slotEnd && new Date(b.end) > cur,
                );
                if (!isBusy) available.push(cur.toISOString());
                cur = slotEnd;
            }
        }
        return { date, barberId, available };
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) { }

    async create(clientId: string, dto: CreateReviewDto) {
        const appt = await this.prisma.appointment.findFirst({
            where: { id: dto.appointmentId, clientId, status: 'COMPLETED' },
        });
        if (!appt) throw new NotFoundException('Solo puedes reseñar citas completadas');

        const existing = await this.prisma.review.findUnique({
            where: { appointmentId: dto.appointmentId },
        });
        if (existing) throw new BadRequestException('Ya dejaste una reseña para esta cita');

        return this.prisma.review.create({
            data: {
                appointmentId: dto.appointmentId,
                clientId,
                rating: dto.rating,
                comment: dto.comment,
            },
        });
    }

    findByBarber(barberId: string) {
        return this.prisma.review.findMany({
            where: { appointment: { barberId } },
            include: { client: { select: { name: true, avatarUrl: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
}

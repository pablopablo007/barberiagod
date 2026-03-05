import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarberPhotoDto } from './dto/barber-photo.dto';

@Injectable()
export class BarberPhotosService {
    constructor(private prisma: PrismaService) { }

    findByBarber(barberId: string) {
        return this.prisma.barberPhoto.findMany({
            where: { barberId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(userId: string, role: string, dto: CreateBarberPhotoDto) {
        // Verificar que el barbero existe
        const barber = await this.prisma.barber.findUnique({
            where: { id: dto.barberId },
        });
        if (!barber) throw new NotFoundException('Barbero no encontrado');

        // Solo el dueño o el propio barbero pueden subir fotos
        if (role === 'BARBER' && barber.userId !== userId) {
            throw new ForbiddenException('No puedes subir fotos al portafolio de otro barbero');
        }

        return this.prisma.barberPhoto.create({
            data: {
                barberId: dto.barberId,
                imageUrl: dto.imageUrl,
                caption: dto.caption,
            },
        });
    }

    async remove(photoId: string, userId: string, role: string) {
        const photo = await this.prisma.barberPhoto.findUnique({
            where: { id: photoId },
            include: { barber: true },
        });
        if (!photo) throw new NotFoundException('Foto no encontrada');

        if (role === 'BARBER' && photo.barber.userId !== userId) {
            throw new ForbiddenException('No puedes eliminar fotos de otro barbero');
        }

        return this.prisma.barberPhoto.delete({ where: { id: photoId } });
    }
}

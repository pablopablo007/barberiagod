import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new BadRequestException('El email ya está en uso');
        }

        const existingTenant = await this.prisma.tenant.findUnique({
            where: { slug: dto.tenantSlug },
        });
        if (existingTenant) {
            throw new BadRequestException('El slug de barbería ya está tomado');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);

        const tenant = await this.prisma.tenant.create({
            data: {
                name: dto.tenantName,
                slug: dto.tenantSlug,
            },
        });

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                name: dto.ownerName,
                phone: dto.phone,
                role: 'OWNER',
                tenantId: tenant.id,
            },
        });

        return this.generateTokens(user.id, tenant.id, user.role);
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: { tenant: true },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const tokens = await this.generateTokens(user.id, user.tenantId, user.role);
        return {
            ...tokens,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenantId: user.tenantId,
            },
        };
    }

    async refreshToken(token: string) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!stored || stored.expiresAt < new Date()) {
            throw new UnauthorizedException('Refresh token inválido o expirado');
        }

        // Rotate token
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });

        return this.generateTokens(stored.user.id, stored.user.tenantId, stored.user.role);
    }

    async logout(token: string) {
        await this.prisma.refreshToken.deleteMany({ where: { token } });
        return { message: 'Sesión cerrada' };
    }

    private async generateTokens(userId: string, tenantId: string, role: string) {
        const payload = { sub: userId, tenantId, role };

        const accessToken = this.jwt.sign(payload, { expiresIn: '15m' });
        const refreshToken = uuidv4();

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await this.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId,
                expiresAt,
            },
        });

        return { accessToken, refreshToken };
    }
}

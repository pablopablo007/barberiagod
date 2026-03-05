import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database for Elite Cut Barber...\n');

    // ─── 1. Tenant ───────────────────────────────────────────────────────
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'elite-cut-barber' },
        update: {},
        create: {
            name: 'Elite Cut Barber',
            slug: 'elite-cut-barber',
            address: 'Calle Principal 45, Madrid',
            phone: '+34 600 000 111',
        },
    });
    console.log(`✅ Tenant: ${tenant.name}`);

    // ─── 2. OWNER ────────────────────────────────────────────────────────
    const ownerHash = await bcrypt.hash('owner1234', 10);
    const owner = await prisma.user.upsert({
        where: { email: 'owner@elitecut.com' },
        update: {},
        create: {
            tenantId: tenant.id,
            name: 'Carlos Dueño',
            email: 'owner@elitecut.com',
            passwordHash: ownerHash,
            role: 'OWNER',
        },
    });
    console.log(`✅ OWNER: ${owner.email}`);

    // ─── 3. BARBER ───────────────────────────────────────────────────────
    const barberHash = await bcrypt.hash('barber1234', 10);
    const barberUser = await prisma.user.upsert({
        where: { email: 'barber@elitecut.com' },
        update: {},
        create: {
            tenantId: tenant.id,
            name: 'Marcos García',
            email: 'barber@elitecut.com',
            passwordHash: barberHash,
            role: 'BARBER',
        },
    });
    await prisma.barber.upsert({
        where: { userId: barberUser.id },
        update: {},
        create: {
            tenantId: tenant.id,
            userId: barberUser.id,
            bio: 'Master Barber con 10 años de experiencia. Fades y barbas clásicas.',
            schedule: { mon: [{ start: '09:00', end: '18:00' }], tue: [{ start: '09:00', end: '18:00' }], wed: [{ start: '09:00', end: '18:00' }], thu: [{ start: '09:00', end: '18:00' }], fri: [{ start: '09:00', end: '18:00' }] },
        },
    });
    console.log(`✅ BARBER: ${barberUser.email}`);

    // ─── 4. CLIENT ───────────────────────────────────────────────────────
    const clientHash = await bcrypt.hash('client1234', 10);
    const client = await prisma.user.upsert({
        where: { email: 'client@elitecut.com' },
        update: {},
        create: {
            tenantId: tenant.id,
            name: 'Andrés López',
            email: 'client@elitecut.com',
            passwordHash: clientHash,
            role: 'CLIENT',
        },
    });
    console.log(`✅ CLIENT: ${client.email}`);

    // ─── 5. Servicios ────────────────────────────────────────────────────
    const services = [
        { name: 'Corte Premium', price: 25, durationMinutes: 45, description: 'Fade + lavado con masaje' },
        { name: 'Arreglo de Barba', price: 15, durationMinutes: 30, description: 'Toalla caliente + aceites premium' },
        { name: 'Combo Corte+Barba', price: 35, durationMinutes: 75, description: 'Experiencia completa' },
    ];
    for (const svc of services) {
        await prisma.service.create({ data: { tenantId: tenant.id, ...svc } }).catch(() => {
            // Ignorar si ya existe (no hay unique compuesto en schema)
        });
    }
    console.log(`✅ ${services.length} servicios creados`);

    // ─── 6. Inventario ───────────────────────────────────────────────────
    const items = [
        { name: 'Cera Fijación Fuerte', quantity: 45, price: 18.50, minThreshold: 10 },
        { name: 'Aceite para Barba', quantity: 12, price: 24.00, minThreshold: 15 },
        { name: 'Shampoo Anticaída', quantity: 28, price: 22.00, minThreshold: 10 },
    ];
    for (const item of items) {
        await prisma.inventory.create({ data: { tenantId: tenant.id, ...item } }).catch(() => { });
    }
    console.log(`✅ ${items.length} productos de inventario creados`);

    // ─── 7. Promoción ────────────────────────────────────────────────────
    await prisma.promotion.create({
        data: {
            tenantId: tenant.id,
            code: 'ELITE10',
            discountPercent: 10,
            validUntil: new Date('2026-12-31'),
            isActive: true,
        },
    }).catch(() => { });
    console.log('✅ Promoción ELITE10 (10% descuento) creada');

    console.log('\n╔═══════════════════════════════════════════════╗');
    console.log('║  🎉 SEED COMPLETADO — Elite Cut Barber        ║');
    console.log('╠═══════════════════════════════════════════════╣');
    console.log('║  OWNER  → owner@elitecut.com  / owner1234     ║');
    console.log('║  BARBER → barber@elitecut.com / barber1234    ║');
    console.log('║  CLIENT → client@elitecut.com / client1234    ║');
    console.log('║  PROMO  → Código: ELITE10 (10% descuento)     ║');
    console.log('╚═══════════════════════════════════════════════╝\n');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());

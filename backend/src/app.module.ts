import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { BarbersModule } from './barbers/barbers.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { InventoryModule } from './inventory/inventory.module';
import { PromotionsModule } from './promotions/promotions.module';
import { BarberPhotosModule } from './barber-photos/barber-photos.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        TenantsModule,
        UsersModule,
        BarbersModule,
        ServicesModule,
        AppointmentsModule,
        PaymentsModule,
        ReviewsModule,
        InventoryModule,
        PromotionsModule,
        BarberPhotosModule,
    ],
})
export class AppModule { }

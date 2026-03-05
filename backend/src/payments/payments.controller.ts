import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
    constructor(private srv: PaymentsService) { }

    @Post()
    create(
        @CurrentUser() u: any,
        @Body('appointmentId') appointmentId: string,
        @Body('method') method: string,
    ) {
        return this.srv.createPayment(appointmentId, u.tenantId, method || 'CASH');
    }

    @Patch(':appointmentId/paid')
    markPaid(@Param('appointmentId') id: string, @CurrentUser() u: any) {
        return this.srv.markPaid(id, u.tenantId);
    }
}

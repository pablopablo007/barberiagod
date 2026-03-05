import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
    constructor(private tenantsService: TenantsService) { }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getMe(@CurrentUser() user: any) {
        return this.tenantsService.getMyTenant(user.tenantId);
    }

    @Patch('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    update(@CurrentUser() user: any, @Body() dto: UpdateTenantDto) {
        return this.tenantsService.update(user.tenantId, dto);
    }

    @Get('public/:slug')
    getPublic(@Param('slug') slug: string) {
        return this.tenantsService.getPublicBySlug(slug);
    }
}

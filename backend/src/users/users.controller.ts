import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
    constructor(private srv: UsersService) { }

    @Get()
    findAll(@CurrentUser() u: any) { return this.srv.findAll(u.tenantId); }

    @Get('me')
    getMe(@CurrentUser() u: any) { return this.srv.findOne(u.id, u.tenantId); }
}

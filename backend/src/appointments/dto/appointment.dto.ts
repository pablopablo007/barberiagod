import {
    IsString, IsDateString, IsOptional,
} from 'class-validator';

export class CreateAppointmentDto {
    @IsString()
    barberId: string;

    @IsString()
    serviceId: string;

    @IsDateString()
    startAt: string;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class UpdateAppointmentDto {
    @IsOptional()
    @IsString()
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

    @IsOptional()
    @IsString()
    notes?: string;
}

import { IsString, IsOptional } from 'class-validator';

export class CreateBarberDto {
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    schedule?: any;
}

export class UpdateBarberDto {
    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    schedule?: any;
}

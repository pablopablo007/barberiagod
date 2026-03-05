import { IsString, IsOptional } from 'class-validator';

export class CreateBarberPhotoDto {
    @IsString()
    barberId: string;

    @IsString()
    imageUrl: string; // En una app real esto viene de S3/Cloudflare R2

    @IsOptional()
    @IsString()
    caption?: string;
}

import { IsString, IsNumber, Min, Max, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePromotionDto {
    @IsString()
    code: string;

    @IsNumber()
    @Min(1)
    @Max(100)
    discountPercent: number;

    @IsDateString()
    validUntil: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

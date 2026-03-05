import { IsString, IsNumber, Min } from 'class-validator';

export class CreateInventoryDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    minThreshold: number;
}

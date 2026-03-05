import { Module } from '@nestjs/common';
import { BarberPhotosService } from './barber-photos.service';
import { BarberPhotosController } from './barber-photos.controller';

@Module({ providers: [BarberPhotosService], controllers: [BarberPhotosController] })
export class BarberPhotosModule { }

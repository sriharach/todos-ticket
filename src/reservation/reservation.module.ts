import { forwardRef, Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './reservation.entity';
import { MusicalRowModule } from '@/musical-row/musical-row.module';
import { MusicalZoneModule } from '@/musical-zone/musical-zone.module';
import { MusicalModule } from '@/musical/musical.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    MusicalRowModule,
    MusicalZoneModule,
    forwardRef(() => MusicalModule),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}

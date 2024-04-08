import { forwardRef, Module } from '@nestjs/common';
import { MusicalController } from './musical.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Musical, MusicalSchema } from './musical.entity';
import { MusicalService } from './musical.service';
import { ReservationModule } from '@/reservation/reservation.module';
import { MusicalZoneModule } from '@/musical-zone/musical-zone.module';
import { MusicalRowModule } from '@/musical-row/musical-row.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Musical.name, schema: MusicalSchema }]),
    forwardRef(() => ReservationModule),
    MusicalZoneModule,
    MusicalRowModule,
  ],
  controllers: [MusicalController],
  providers: [MusicalService],
  exports: [MusicalService],
})
export class MusicalModule {}

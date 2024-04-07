import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicalZone, MusicalZoneSchema } from './musical-zone.entity';
import { MusicalZoneController } from './musical-zone.controller';
import { MusicalZoneService } from './musical-zone.service';
import { MusicalRowModule } from '@/musical-row/musical-row.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MusicalZone.name, schema: MusicalZoneSchema },
    ]),
    forwardRef(() => MusicalRowModule),
  ],
  controllers: [MusicalZoneController],
  providers: [MusicalZoneService],
  exports: [MusicalZoneService],
})
export class MusicalZoneModule {}

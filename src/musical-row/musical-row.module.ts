import { forwardRef, Module } from '@nestjs/common';
import { MusicalRowController } from './musical-row.controller';
import { MusicalRowService } from './musical-row.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicalRow, MusicalRowSchema } from './musical-row.entity';
import { MusicalZoneModule } from '@/musical-zone/musical-zone.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MusicalRow.name, schema: MusicalRowSchema },
    ]),
    forwardRef(() => MusicalZoneModule)
  ],
  controllers: [MusicalRowController],
  providers: [MusicalRowService],
  exports: [MusicalRowService],
})
export class MusicalRowModule {}

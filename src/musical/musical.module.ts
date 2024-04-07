import { Module } from '@nestjs/common';
import { MusicalController } from './musical.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Musical, MusicalSchema } from './musical.entity';
import { MusicalService } from './musical.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Musical.name, schema: MusicalSchema }]),
  ],
  controllers: [MusicalController],
  providers: [MusicalService],
  exports: [MusicalService],
})
export class MusicalModule {}

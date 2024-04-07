import { MusicalRow } from '@/musical-row/musical-row.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'musicals_zone' })
export class MusicalZone {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  musical_id: Types.ObjectId;

  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  seats: number;

  @Prop({ default: true })
  is_open_zone: boolean;
}

export const MusicalZoneSchema = SchemaFactory.createForClass(MusicalZone);

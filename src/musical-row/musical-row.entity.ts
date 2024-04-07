import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'musicals_row' })
export class MusicalRow {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  musical_id: Types.ObjectId;

  @Prop()
  musical_zone_id: Types.ObjectId;

  @Prop()
  seats_no: string;

  @Prop()
  user_id: Types.ObjectId;

  @Prop({ default: false })
  reservation: boolean;
}

export const MusicalRowSchema = SchemaFactory.createForClass(MusicalRow);

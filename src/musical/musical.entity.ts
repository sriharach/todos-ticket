import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Types } from 'mongoose';

@Schema({ collection: 'musicals' })
export class Musical {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  musical_name: string;

  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  musical_zone_id: Types.ObjectId;

  @Prop()
  musical_description: string;

  @Prop()
  activity_date: string;

  @Prop({ default: 1 })
  amount_zone: number;
}

export const MusicalSchema = SchemaFactory.createForClass(Musical);

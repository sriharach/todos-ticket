import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes, Types } from 'mongoose';

@Schema({ collection: 'reservation' })
export class Reservation {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  musical_row_id: Types.ObjectId;

  @Prop()
  user_id: Types.ObjectId;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

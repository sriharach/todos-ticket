import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthEntity>;

@Schema({ collection: 'users' })
export class AuthEntity {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthEntity);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeepMatchesDocument = HydratedDocument<DeepMatches>;

@Schema()
export class DeepMatches {
  @Prop()
  category: string;

  @Prop({ type: Date, required: true })
  timestamp: Date;

  @Prop()
  object_id: number;

  @Prop()
  author_id: number;

  @Prop([Object])
  details: object[];
}

export const DeepMatchesSchema = SchemaFactory.createForClass(DeepMatches);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ChangesAction } from '../enums/changes-action.enum';

export type DeepMatchesDocument = HydratedDocument<DeepMatches>;

@Schema()
export class DeepMatches {
  @Prop()
  category: string;

  @Prop({ type: Date, required: true })
  timestamp: Date;

  @Prop({ type: String, default: ChangesAction.UNKNOWN })
  action: ChangesAction;

  @Prop()
  object_id: number;

  @Prop()
  author_id: number;

  @Prop([Object])
  details: object[];
}

export const DeepMatchesSchema = SchemaFactory.createForClass(DeepMatches);

import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Guild {
  @prop({ required: true, type: () => String })
  public _id!: string;
}

export const GuildModel = getModelForClass(Guild);

import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Account {
  @prop({ required: true, type: () => String })
  public _id!: string;
}

export const AccountModel = getModelForClass(Account); // UserModel is a regular Mongoose Model with correct types

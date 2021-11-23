import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';

import { Character } from '../character/character.model';
import { ItemTypes } from '../constants/item-types';
import { Ranks } from '../constants/ranks';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Item {
  @prop({ required: true, type: String })
  public _id!: string;

  @prop({ required: true, type: String })
  public name!: string;

  // @prop({ required: true, type:  String, ref:  Account })
  // public accountId!: string;

  @prop({
    required: true,
    type: () => String,
    enum: Object.keys(ItemTypes),
  })
  public type!: keyof typeof ItemTypes;

  @prop({
    required: true,
    type: () => String,
    enum: Object.keys(Ranks),
  })
  public rank!: keyof typeof Ranks;

  // @prop({ required: true, type: Number })
  // public level!: number;

  // @prop({ required: true, type: String })
  // public experience!: string;

  @prop({ required: true, type: Number, default: 0 })
  public value!: number;

  @prop({ required: true, type: [String], default: [] }, WhatIsIt.ARRAY)
  public effects!: string[];

  @prop({ required: false, type: String, ref: Character })
  public createdBy?: string;
}

export const ItemModel = getModelForClass(Item);

import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { ulid } from 'ulid';

import { Character } from '../character/character.model';
import { Item } from './item.model';
import { ItemTypes } from '../constants/item-types';
import { Ranks } from '../constants/ranks';

@modelOptions({ schemaOptions: { timestamps: true } })
export class ItemStack {
  @prop({ required: true, type: String, default: ulid })
  public _id!: string;

  @prop({ required: false, type: String, ref: Item })
  public itemId!: Item;

  // FIXME: i'm 100% sure this is going to cause me trouble in the future, but oh well. such is the life of a programmer.
  @prop({ required: false, type: String, ref: Character })
  public inventoryId!: Character;

  @prop({
    required: true,
    type: String,
    enum: Object.keys(ItemTypes),
  })
  public type!: keyof typeof ItemTypes;

  @prop({
    required: true,
    type: String,
    enum: Object.keys(Ranks),
  })
  public rank!: keyof typeof Ranks;

  @prop({ required: true, type: String })
  public experience!: string;

  @prop({ required: true, type: Number, default: 0 })
  public value!: number;

  // TODO: make this a ref when we have a model for it
  @prop({ required: true, type: [String], default: [] }, WhatIsIt.ARRAY)
  public effects!: string[];

  @prop({ required: false, type: String, ref: Character })
  public craftedBy?: Character;
}

export const ItemModel = getModelForClass(ItemStack);

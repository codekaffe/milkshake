/**
 * An Action is something that can be done by a Character outside of combat
 * that changes the state of the character, the world, the entities in the world
 * or the timeline.
 * Examples: moving, attacking, using an item, opening a shop, talking to someone, etc.
 */

import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { ulid } from 'ulid';

import { ActionTypes } from '../constants/action-types';
import { RequirementList } from './requirement-list.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Action {
  @prop({ required: true, type: () => String, default: ulid })
  public _id!: string;

  @prop({ required: true, type: () => String })
  public name!: string;

  @prop({ required: true, type: () => String })
  public description!: string;

  @prop({
    required: true,
    type: () => String,
    enum: Object.keys(ActionTypes),
  })
  public type!: keyof typeof ActionTypes;

  @prop({ _id: false, required: true, type: RequirementList })
  public requirements!: RequirementList;
}

export const ActionModel = getModelForClass(Action);

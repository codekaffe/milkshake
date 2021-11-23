import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { ulid } from 'ulid';
import { Ranks } from '../constants/ranks';

class SkillRequirement {
  @prop({ required: true, type: () => String, ref: () => Skill })
  public skillId!: string;

  @prop({ required: true, type: () => Number })
  public level!: number;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Skill {
  @prop({ required: true, type: () => String, default: ulid })
  public _id!: string;

  @prop({ required: true, type: () => String })
  public name!: string;

  @prop({ required: true, type: () => String })
  public description!: string;

  @prop({ required: true, type: () => String, enum: [] })
  public type!: string;

  @prop({
    required: true,
    type: () => String,
    enum: Object.keys(Ranks),
  })
  public rank!: keyof typeof Ranks;

  @prop({ required: true, type: () => [String] })
  public requiredFlags!: string[];

  @prop({ required: true, type: () => [String] })
  public forbiddenFlags!: string[];

  @prop({ _id: false, required: true, type: [SkillRequirement] })
  public requiredSkills!: SkillRequirement[];

  @prop({ required: true, type: () => Number, default: 0 })
  public requiredGold!: number;

  @prop({ required: true, type: () => Number, default: 0 })
  public requiredLevel!: number;
}

export const SkillModel = getModelForClass(Skill);

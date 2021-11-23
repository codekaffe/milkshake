/**
 * A multipurpose requirement list.
 */

import { prop } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';

import { Ranks } from '../constants/ranks';

class SkillRequirement {
  @prop({ required: true, type: () => String, ref: () => RequirementList })
  public skillId!: string;

  @prop({ required: true, type: () => Number })
  public level!: number;
}

export class RequirementList {
  @prop({ required: false, type: () => [String] })
  public requiredFlags?: string[];

  @prop({ required: false, type: () => [String] })
  public forbiddenFlags?: string[];

  @prop(
    { _id: false, required: false, type: [SkillRequirement] },
    WhatIsIt.ARRAY,
  )
  public requiredSkills?: SkillRequirement[];

  @prop({ required: false, type: () => Number, default: 0 })
  public requiredGold?: number;

  @prop({ required: false, type: () => Number, default: 0 })
  public requiredLevel?: number;

  @prop({ required: false, type: () => String })
  public requiredQuestCompleted?: string;

  // TODO: add ref when we have the model
  @prop({ required: false, type: [String] }, WhatIsIt.ARRAY)
  public requiredRace?: string[];

  // TODO: add ref when we have the model
  @prop({ required: false, type: [String] }, WhatIsIt.ARRAY)
  public requiredClass?: string[];

  @prop({
    required: false,
    type: () => String,
    enum: Object.keys(Ranks),
  })
  public type!: keyof typeof Ranks;

  // TODO: location, time, items and maybe more.
}

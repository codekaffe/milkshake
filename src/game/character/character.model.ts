import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { Account } from '../../models/account.model';
import { Skill } from './skill.model';

class CharacterState {
  @prop({ required: true, type: () => Boolean, default: false })
  public isActive!: boolean;
  @prop({ required: true, type: () => Boolean, default: false })
  public isDead!: boolean;
  @prop({ required: true, type: () => Boolean, default: false })
  public isInBattle!: boolean;
  @prop({ required: true, type: () => Boolean, default: false })
  public isResting!: boolean;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Character {
  @prop({ required: true, type: () => String })
  public _id!: string;

  @prop({ required: true, type: () => String })
  public firstName!: string;
  @prop({ required: true, type: () => String })
  public lastName!: string;

  @prop({ required: true, type: () => String, ref: () => Account })
  public accountId!: string;

  // TODO: change to partyId
  @prop({ required: false, type: () => String })
  public partyId?: string;

  @prop({ required: true, type: () => Boolean, default: false })
  public isNPC!: boolean;
  @prop({ required: true, type: () => Boolean, default: false })
  public isMonster!: boolean;

  // TODO: change to ref when model is available
  @prop({ required: true, type: () => String })
  public classId!: string;

  // TODO: change to ref when model is available
  @prop({ required: true, type: () => String })
  public raceId!: string;

  // TODO: change to ref when model is available
  @prop({ required: true, type: () => String })
  public genderId!: string;

  @prop({ required: true, type: () => Number })
  public level!: number;

  @prop({ required: true, type: () => String })
  public experience!: string;

  @prop({ required: true, type: () => Number })
  public gold!: number;

  @prop({ _id: false, required: true, type: () => CharacterSkills })
  public characterSkills!: CharacterSkills[];

  public canLearnSkill(skill: Skill): boolean {
    return !this.characterSkills.some((cs) => cs.skillId === skill._id);
  }
}

class CharacterSkills {
  @prop({ required: true, type: () => String, ref: () => Skill })
  public skillId!: string;

  @prop({ required: true, type: () => Number })
  public level!: number;

  @prop({ required: true, type: () => Date })
  public acquiredAt!: Date;
}

export const CharacterModel = getModelForClass(Character);

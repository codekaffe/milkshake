/**
 * A character is a player, NPC or monster in the game.
 */

import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { TextHelpers } from 'sensum';

import { Account } from '../../models/account.model';
import { EntityFormat, IEntityFormatOptions } from '../interfaces';
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

  @prop({ required: true, type: () => Number, default: 1 })
  public level!: number;

  @prop({ required: true, type: () => String })
  public experience!: string;

  @prop({ required: true, type: () => Number })
  /**
   * The character's current gold.
   */
  public gold!: number;

  @prop({ _id: false, required: true, type: () => CharacterSkills })
  /**
   * The list of skills the character has unlocked and their level.
   */
  public skills!: CharacterSkills[];

  // TODO: add titles

  updatedAt!: Date;
  createdAt!: Date;

  public canLearnSkill(skill: Skill): boolean {
    return !this.skills.some((cs) => cs.skillId === skill._id);
  }

  public format(options: IEntityFormatOptions): EntityFormat {
    if (options.embed) {
      options.embed.setTitle(`${this.firstName} ${this.lastName}`);
      options.embed.setDescription(
        TextHelpers.lines(`🌟 **${this.level}**`, `💰 **${this.gold}**`),
      );
      if (options.user) {
        options.embed.setFooter(
          this.createdAt.toLocaleString(),
          options.user.displayAvatarURL(),
        );
      }
      return options.embed;
    }

    // TODO: implement
    throw new Error('Not implemented');
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

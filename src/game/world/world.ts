import {
  prop,
  getModelForClass,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { TextHelpers } from 'sensum';
import { ulid } from 'ulid';

import { Account } from '../../models/account.model';
import { Guild } from '../../models/guild.model';
import { GameFlag } from '../flags/flag';
import { IEntityFormatOptions, EntityFormat } from '../interfaces';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'worlds' } })
export class World {
  @prop({ required: true, type: String, default: ulid })
  public _id!: string;

  @prop({ required: true, type: String, ref: () => Guild })
  public guildId!: Ref<Guild>;

  @prop({ required: true, type: String, ref: () => Account })
  public creatorId!: Ref<Account>;

  @prop({ required: true, type: String })
  public name!: string;

  @prop({ required: true, type: String })
  public description!: string;

  @prop({ type: () => [String], default: [] }, WhatIsIt.ARRAY)
  public flags!: string[]; // This is a Primitive Array

  updatedAt!: Date;
  createdAt!: Date;

  public hasFlag(flag: GameFlag): boolean {
    return this.flags.includes(flag.selfName);
  }

  public format(options: IEntityFormatOptions): EntityFormat {
    if (options.embed) {
      options.embed.setTitle(this.name);
      options.embed.setDescription(this.description);
      if (options.user) {
        options.embed.setFooter(
          this.createdAt.toLocaleString(),
          options.user.displayAvatarURL(),
        );
      }
      return options.embed;
    }

    return TextHelpers.lines(
      `:earth_americas: **${this.name}**`,
      this.description,
    );
  }
}

export const WorldModel = getModelForClass(World);

import {
  Interaction,
  MessageEmbed,
  MessageOptions,
  MessagePayload,
  User,
} from 'discord.js';
import { IBotMessage } from 'sensum';
import { Flag } from './flags/flag';

export interface IIsekaiParameter {
  selfName: string;
  description: string;
  requirements: typeof Flag[];
  incompatible: typeof Flag[];
  weight: number;
}

export interface IEntityFormatOptions {
  user?: User;
  embed?: MessageEmbed;
}

export type EntityFormat = string | MessageEmbed;

export type MessageContent = string | MessagePayload | MessageOptions;
export type CommandEvent = IBotMessage | Interaction;

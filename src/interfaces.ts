import { BotClient } from 'sensum';
import { TextGenerator } from '@refabric/text';
import {
  Collection,
  CommandInteraction,
  Interaction,
  MessageSelectMenu,
  SelectMenuInteraction,
} from 'discord.js';

export type MenuInteractionHandler = (
  bot: IMilkshakeClient,
  interaction: SelectMenuInteraction,
) => Promise<void> | void;
export type CommandInteractionHandler = (
  bot: IMilkshakeClient,
  interaction: CommandInteraction,
) => Promise<void> | void;

export interface MenuDefinition {
  handler: MenuInteractionHandler;
  menu: MessageSelectMenu;
}

export type IMilkshakeClient = BotClient & {
  brain: TextGenerator;
  interactions: Collection<
    string,
    CommandInteractionHandler | MenuInteractionHandler
  >;
  menus: Collection<string, MenuDefinition>;
};

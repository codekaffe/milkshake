import {
  Interaction,
  Message,
  MessageActionRow,
  MessageSelectMenu,
  SelectMenuInteraction,
} from 'discord.js';
import { EventHandler, IBotClient } from 'sensum';
import { IMilkshakeClient, MenuDefinition } from '../interfaces';

interface SubMenuOptionBase {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  consumeMenu?: boolean;
}
export type SubMenuOptionWithSubMenu = SubMenuOptionBase & {
  submenu: Menu;
};
export type SubMenuOptionWithHandler = SubMenuOptionBase & {
  handler: (
    bot: IMilkshakeClient,
    interaction: SelectMenuInteraction,
  ) => Promise<void> | void;
};
export type SubMenuOption = SubMenuOptionWithSubMenu | SubMenuOptionWithHandler;

export interface Menu {
  id: string;
  placeholder: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  options: SubMenuOption[];
  prompt?: string;
}

type MenuDefinitionRecord = Record<string, MenuDefinition>;

export function parseMenuDefinition(
  menu: Menu,
  keyAccumulator: string[] = [],
  accumulator: MenuDefinitionRecord = {},
): MenuDefinitionRecord {
  const result: MenuDefinitionRecord = Object.assign({}, accumulator);
  const key = [...keyAccumulator, menu.id];

  // Start building the component for the current menu
  result[key.join('-')] = {
    handler: undefined,
    menu: new MessageSelectMenu()
      .setCustomId(key.join('-'))
      .setPlaceholder(menu.placeholder)
      .setDisabled(menu.disabled || false),
  } as unknown as MenuDefinition;

  if (menu.min) result[key.join('-')].menu.setMinValues(menu.min);
  if (menu.max) result[key.join('-')].menu.setMaxValues(menu.max);

  if (menu.prompt) (result[key.join('-')].menu as any)._prompt = menu.prompt;

  // Add the options to the menu and save the handler for the menu option
  for (const option of menu.options) {
    const hasBoth =
      (option as SubMenuOptionWithHandler).handler &&
      (option as SubMenuOptionWithSubMenu).submenu;
    const hasNeither =
      !(option as SubMenuOptionWithHandler).handler &&
      !(option as SubMenuOptionWithSubMenu).submenu;

    if (hasBoth) {
      throw new Error(
        `Menu ${menu.id} cannot have both handler and submenu (${key})`,
      );
    }
    if (hasNeither) {
      throw new Error(
        `Menu ${menu.id} must have at least one of handler or submenu (${key})`,
      );
    }

    // Add this option to the current menu
    result[key.join('-')].menu.addOptions({
      label: option.label,
      value: option.value,
      description: option.description,
      emoji: option.emoji,
    });

    // Register this handler for the option added
    if ((option as SubMenuOptionWithHandler).handler) {
      if (!result[key.join('-') + '-' + option.value]) {
        result[key.join('-') + '-' + option.value] = {
          handler: (option as SubMenuOptionWithHandler).handler,
          menu: undefined,
        } as unknown as MenuDefinition;
      } else {
        result[key.join('-') + '-' + option.value].handler = (
          option as SubMenuOptionWithHandler
        ).handler;
      }
      (result[key.join('-') + '-' + option.value].handler as any)._consume = option.consumeMenu;
    }

    // Recurse the next menu if available
    if ((option as SubMenuOptionWithSubMenu).submenu) {
      Object.assign(
        result,
        parseMenuDefinition(
          (option as SubMenuOptionWithSubMenu).submenu,
          key,
          result,
        ),
      );
    }
  }

  return result;
}

export function registerMenu(
  bot: IMilkshakeClient,
  menu: Menu,
): MenuDefinitionRecord {
  const menus = parseMenuDefinition(menu);

  for (const key of Object.keys(menus)) {
    if (!menus[key].handler) {
      menus[key].handler = replaceCurrentMenuWithTheNextMenu;
    }
  }

  for (const [id, definition] of Object.entries(menus)) {
    bot.menus.set(id, definition);
  }

  return menus;
}

async function replaceCurrentMenuWithTheNextMenu(
  bot: IMilkshakeClient,
  interaction: SelectMenuInteraction,
) {
  const nextMenu = bot.menus.get(
    interaction.customId + '-' + interaction.values[0],
  );
  console.log(
    'Trying to send this menu:',
    interaction.customId,
    interaction.values,
    interaction.customId + '-' + interaction.values[0],
    // nextMenu!.menu,
  );
  if (!nextMenu) {
    bot.emit('error', new Error(`Menu ${interaction.values[0]} not found`));
    return;
  }
  await (interaction.message as Message).edit({
    content: (nextMenu.menu as any)._prompt ?? interaction.message.content,
    components: [new MessageActionRow().addComponents(nextMenu.menu)],
  });
}

export default new EventHandler({
  name: 'interactionCreate',
  enabled: true,
  async run(bot: IBotClient, interaction: Interaction) {
    if (!interaction.isSelectMenu()) {
      return;
    }
    try {
      const menuHandler = (bot as IMilkshakeClient).menus
        .get(interaction.customId)
        ?.handler(
          bot as IMilkshakeClient,
          interaction as SelectMenuInteraction,
        );
      if (menuHandler instanceof Promise) {
        await menuHandler;
      }
    } catch (err) {
      bot.emit('error', err as Error);
      const errorMessage = 'There was an error while executing that.';
      await (interaction.replied
        ? interaction.followUp({
            content: errorMessage,
            ephemeral: true,
          })
        : interaction.reply({
            content: errorMessage,
            ephemeral: true,
          }));
    }
  },
});

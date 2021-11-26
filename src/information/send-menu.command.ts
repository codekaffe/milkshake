import { MessageActionRow } from 'discord.js';
import { Command, Permission } from 'sensum';
import { IMilkshakeClient } from '../interfaces';
import { fixture } from '../select-menus/fixtures';
import { registerMenu } from '../select-menus/submenu-system';

export default new Command({
  name: 'menu',
  aliases: ['_noSlash'],
  description: 'Test command for menus',
  permission: Permission.BOT_OWNER,
  init(bot) {
    registerMenu(bot as any, fixture);
  },
  async run(bot: IMilkshakeClient, message, ctx) {
    const menu = bot.menus.get(ctx.content);
    await message.channel.send({
      content: (menu?.menu as any)._prompt ?? 'Menu test',
      components: [new MessageActionRow().addComponents(menu!.menu)],
    });
  },
});

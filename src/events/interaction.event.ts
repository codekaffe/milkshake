import { Message } from 'discord.js';
import { EventHandler } from 'sensum';
import { IMilkshakeClient } from '../interfaces';
import { Logger } from '../logging/logger';

export default new EventHandler({
  name: 'interactionCreate',
  enabled: true,
  async run(bot, interaction) {
    if (interaction.isCommand()) {
      try {
        const cmdRun = bot.commands
          .get(interaction.commandName)
          ?.run(bot as any, interaction as any, {} as any);
        if (cmdRun instanceof Promise) {
          await cmdRun;
        }
      } catch (err) {
        Logger.error(err);
        const errorMessage = 'There was an error while executing this command!';
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
    }
    if (interaction.isSelectMenu()) {
      console.log('interaction.customId: ', interaction.customId);
      try {
        const handler = (bot as IMilkshakeClient).menus.get(
          interaction.customId,
        )?.handler;
        if (!handler) {
          throw new Error(`Menu ${interaction.customId} not found`);
        }
        const nextMenu = (bot as IMilkshakeClient).menus.get(
          interaction.customId + '-' + interaction.values[0],
        );
        const isNextMenuAHandler = !nextMenu?.menu && nextMenu?.handler;
        let ran;
        if (isNextMenuAHandler) {
          ran = nextMenu.handler(bot as IMilkshakeClient, interaction);
        } else {
          ran = handler(bot as any, interaction as any);
        }

        if (ran instanceof Promise) {
          await ran;
        }
        console.log('(nextMenu.handler as any)._consume: ', (nextMenu?.handler as any)._consume);
        if (isNextMenuAHandler && (nextMenu.handler as any)._consume) {
          // await (interaction.message as Message).edit({
          //   content: interaction.message.content,
          //   components: []
          // });
          await (interaction.message as Message).delete();
        }
        if (!interaction.replied) {
          await interaction.deferUpdate();
        }
      } catch (err) {
        Logger.error(err);
        const errorMessage = 'There was an error while executing this command!';
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
    }
  },
});

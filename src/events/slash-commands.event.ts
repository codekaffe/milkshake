import { EventHandler } from 'sensum';
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
  },
});

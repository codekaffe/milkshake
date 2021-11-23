import { EventHandler } from 'sensum';
import { Logger } from '../logging/logger';

export default new EventHandler({
  name: 'ready',
  enabled: true,
  // description: 'The ready event is fired when the bot is ready to start, and is the point at which most code should be run.',
  run: async (bot) => {
    Logger.log(`${bot.user!.username} is ready!`);
  },
});

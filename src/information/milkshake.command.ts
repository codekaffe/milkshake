import { Command, Permission } from 'sensum';
import { IMilkshakeClient } from '../interfaces';

export default new Command({
  name: 'milkshake',
  aliases: ['milk', 'shake', 'ms'],
  description: 'Shows you some information about Milkshake',
  permission: Permission.USER,
  async run(bot: IMilkshakeClient) {
    await this.send!(bot.brain.think('Milkshake'));
  },
});

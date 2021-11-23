import { Command, Permission } from 'sensum';

import { IMilkshakeClient } from '../interfaces';
import { AccountModel } from '../models/account.model';
import { CommandInteraction, Interaction, Message } from 'discord.js';

const command = new Command({
  name: 'me',
  aliases: ['whoami'],
  description: 'Shows information about you',
  permission: Permission.USER,
  async run(bot: IMilkshakeClient, msg) {
    const event: Message | Interaction = msg as any;

    const userId = event instanceof Message ? event.author.id : event.user.id;

    let user = await AccountModel.findById(userId);
    if (!user) {
      user = await AccountModel.create({ _id: userId });
    }

    const content = '```' + JSON.stringify(user.toObject(), null, 2) + '```';

    if (event instanceof Message) {
      await event.channel.send(content);
      return;
    }

    if (event instanceof CommandInteraction) {
      await event.reply({ content, ephemeral: true });
    }
  },
});

export default command;

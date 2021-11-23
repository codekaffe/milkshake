import {
  CommandInteraction,
  Interaction,
  Message,
  MessageEmbed,
  MessageOptions,
  MessagePayload,
} from 'discord.js';
import { Command, IBotMessage, Permission } from 'sensum';
import { getCommandUser, sendMessage } from '../../helpers/send-error-message';

import { IMilkshakeClient } from '../../interfaces';
import { AccountModel } from '../../models/account.model';
import { MedievalFantasyWorldModel } from '../world/world';

export default new Command({
  name: 'world',
  aliases: ['w'],
  description: 'Shows information about the world.',
  permission: Permission.USER,
  runIn: ['guild'],
  async run(bot: IMilkshakeClient, msg) {
    const author = getCommandUser(msg);
    let user = await AccountModel.findById(author.id);
    console.log('user: ', user);
    if (!user) {
      user = await AccountModel.create({ _id: author.id });
    }

    const worlds = await MedievalFantasyWorldModel.find({
      guildId: msg.guild!.id,
    });
    if (!worlds.length) {
      const message = [
        `Looks like __${msg.guild!.name}__ doesn't have a world yet.`,
      ];
      if (msg.guild?.ownerId === author.id) {
        message.push(
          'Would you like to create one?',
          `You can do that by using the **${bot.config.defaultSettings.prefix}genesis** command.`,
        );
      }
      await sendMessage(msg, bot.lines(...message));
      return;
    }

    await sendMessage(msg, {
      embeds: [
        worlds[0].format({
          user: author,
          embed: new MessageEmbed(),
        }) as MessageEmbed,
      ],
    });
  },
});

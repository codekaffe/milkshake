import {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  TextChannel,
} from 'discord.js';

import { Command, IBotMessage, Permission } from 'sensum';
import Prompter from 'chop-prompter';

import { sendErrorMessage } from '../../helpers/send-error-message';
import { IMilkshakeClient } from '../../interfaces';
import { AccountModel } from '../../models/account.model';
import { MedievalFantasyWorldModel } from '../world/world';
import { flagIndex } from '../flags/flag-index';

export default new Command({
  name: 'play',
  aliases: ['play', 'go', '__noSlash'],
  description: 'Play the game.',
  permission: Permission.USER,
  runIn: ['guild'],
  async run(bot: IMilkshakeClient, msg: IBotMessage) {
    let user = await AccountModel.findById(msg.author.id);
    if (!user) {
      user = await AccountModel.create({ _id: msg.author.id });
    }

    const world = await MedievalFantasyWorldModel.findOne({
      guildId: msg.guild!.id,
    });
    if (!world) {
      await sendErrorMessage(
        msg.channel as TextChannel,
        `This server doesn't have a world yet.`,
      );
      return;
    }

    // do game logic
  },
});

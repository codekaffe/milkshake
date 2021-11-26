import {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  SelectMenuInteraction,
  TextChannel,
} from 'discord.js';

import { Command, IBotMessage, Permission } from 'sensum';

import {
  sendErrorMessage,
  sendMessage,
} from '../../helpers/send-error-message';
import { IMilkshakeClient } from '../../interfaces';
import { AccountModel } from '../../models/account.model';
import { WorldModel } from '../world/world';
import { flagIndex } from '../flags/flag-index';
import { CharacterModel } from '../character/character.model';
import { ActionTypes } from '../constants/action-types';
import { Logger } from '../../logging/logger';

export default new Command({
  name: 'play',
  aliases: ['play', 'go', '__noSlash'],
  description: 'Play the game.',
  permission: Permission.USER,
  runIn: ['guild'],
  init(bot: IMilkshakeClient) {
    bot.interactions.set(
      'player_action',
      async (bot: IMilkshakeClient, interaction: SelectMenuInteraction) => {
        console.log('interaction: ', interaction);
        Logger.log(`${interaction.user.tag} used ${interaction.values}`);
        await interaction.reply({
          content: `You used ${interaction.values}!`,
        });
      },
    );
  },
  async run(bot: IMilkshakeClient, msg: IBotMessage) {
    let user = await AccountModel.findById(msg.author.id);
    if (!user) {
      user = await AccountModel.create({ _id: msg.author.id });
    }

    const world = await WorldModel.findOne({
      guildId: msg.guild!.id,
    });
    if (!world) {
      await sendErrorMessage(
        msg.channel as TextChannel,
        `This server doesn't have a world yet.`,
      );
      return;
    }

    // Character selection
    const characters = await CharacterModel.find({ accountId: user._id });
    if (!characters.length) {
      // TODO: Summon truck-kun and isekai this person
    }

    // TODO: If player is already performing an action, don't show the menu. Just progress the action.

    // do game logic
    const row = new MessageActionRow();
    const menu = new MessageSelectMenu()
      .setCustomId('player_action')
      .setPlaceholder('Nothing selected');

    for (const [actionName, action] of Object.entries(ActionTypes)) {
      menu.addOptions({
        label: action.menuLabel,
        value: actionName,
        // description: '',
        emoji: action.menuEmoji,
      });
    }
    row.addComponents(menu);

    await sendMessage(msg, { content: 'What will you do?', components: [row] });
  },
});

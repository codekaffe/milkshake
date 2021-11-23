import {
  CommandInteraction,
  Interaction,
  Message,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  TextChannel,
} from 'discord.js';
import { Command, IBotMessage, Permission } from 'sensum';

import {
  getCommandUser,
  prompt,
  sendErrorMessage,
  sendMessage,
} from '../../helpers/send-error-message';
import { IMilkshakeClient } from '../../interfaces';
import { AccountModel } from '../../models/account.model';
import { WorldModel } from '../world/world';
import { flagIndex } from '../flags/flag-index';
import { CommandEvent } from '../interfaces';

export default new Command({
  name: 'genesis',
  aliases: ['gen'],
  description: 'Collection of commands used to manage worlds.',
  permission: Permission.SERVER_OWNER,
  runIn: ['guild'],
  async run(bot: IMilkshakeClient, msg: IBotMessage, a) {
    const event: Message | Interaction = msg as any;

    if (event instanceof CommandInteraction) {
      await event.reply('Starting genesis process...');
    }

    const userId = event instanceof Message ? event.author.id : event.user.id;

    let user = await AccountModel.findById(userId);
    if (!user) {
      user = await AccountModel.create({ _id: userId });
    }

    const worlds = await WorldModel.find({
      guildId: event.guild!.id,
    });
    if (worlds.length > 0) {
      await sendErrorMessage(
        event.channel as TextChannel,
        `This server already has a world.`,
        0,
        false,
      );
      return;
    }

    const worldNameRes = await prompt(
      'What would you like to name your world?',
      event as CommandEvent,
      userId,
    ).catch(() => {});

    if (!worldNameRes) {
      await sendErrorMessage(
        event.channel as TextChannel,
        `Cancelling...`,
        0,
        false,
      );
      return;
    }
    const worldName = worldNameRes.content;

    const worldDescRes = await prompt(
      'Give a short description of your world.',
      event as CommandEvent,
      userId,
    ).catch(() => {});

    if (!worldDescRes) {
      await sendErrorMessage(
        event.channel as TextChannel,
        `Cancelling...`,
        0,
        false,
      );
      return;
    }
    const worldDescription = worldDescRes.content;

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('create_world_flags')
        .setPlaceholder('Nothing selected')
        .setMinValues(1)
        .setMaxValues(3)
        .addOptions(
          Object.values(flagIndex.allFlags).map((flag) => {
            return {
              label: flag.title,
              description: flag.description,
              value: flag.selfName,
            };
          }),
        ),
    );

    const world = new WorldModel({
      creatorId: userId,
      guildId: event.guild!.id,
      name: worldName,
      description: worldDescription,
      flags: [],
    });
    await world.save();

    const worldInfo = {
      content: 'World created!',
      embeds: [
        world.format({
          user: getCommandUser(event as CommandEvent),
          embed: new MessageEmbed(),
        }) as MessageEmbed,
      ],
    };
    const successMessage = await sendMessage(event as CommandEvent, worldInfo);
    await (successMessage as IBotMessage).react('🌎').catch(() => {});

    // TODO add tag stuff
    await sendMessage(event as CommandEvent, {
      content: 'Now add some tags to it:',
      components: [row],
    });
  },
});

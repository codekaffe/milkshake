import {
  CommandInteraction,
  Interaction,
  Message,
  MessageOptions,
  MessagePayload,
  TextChannel,
  User,
} from 'discord.js';
import { IBotMessage } from 'sensum';
import { MessageContent } from '../game/interfaces';

export async function sendErrorMessage(
  channel: TextChannel,
  error: string,
  delay = 5000,
  deleteMessage = true,
): Promise<void> {
  const msg = await channel.send(error);
  await msg.react('❌');
  if (deleteMessage) {
    setTimeout(() => msg.delete().catch(() => {}), delay);
  }
}

export async function sendMessage(
  event: IBotMessage | Interaction,
  content: string | MessagePayload | MessageOptions,
): Promise<IBotMessage> {
  if (event instanceof Message) {
    return (await event.channel.send(content)) as unknown as IBotMessage;
  }

  return (await event.channel!.send(content)) as unknown as IBotMessage;
}

export function getCommandUser(event: IBotMessage | Interaction): User {
  return event instanceof Message ? event.author : (event as Interaction).user;
}

export async function prompt(
  question: MessageContent,
  event: IBotMessage | Interaction,
  userId: string,
): Promise<Message<boolean> | undefined> {
  await sendMessage(event, question);
  const collectedMessages = await event.channel!.awaitMessages({
    errors: ['time'],
    max: 1,
    time: 30000,
    filter: (m: Message) => m.author.id === userId,
  });
  return collectedMessages.first();
}

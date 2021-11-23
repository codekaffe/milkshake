import { BotClient } from 'sensum';
import { TextGenerator } from '@refabric/text';

export type IMilkshakeClient = BotClient & {
  brain: TextGenerator;
};

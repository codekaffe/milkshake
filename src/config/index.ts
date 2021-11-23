import { IConfig } from 'sensum';

const owner = '517599684961894400';

const config: IConfig = {
  token: process.env.DISCORD_TOKEN!,
  ownerID: owner,
  admins: [''],
  support: [''],
  debug: true,
  defaultSettings: {
    prefix: '.',
    modRole: 'Moderator',
    adminRole: 'Administrator',
  },
  defaultProfile: {},
  messages: {
    COOLDOWN: '',
    USAGE: '',
    COMMAND_FEEDBACK_SERVER_ONLY: '',
    COMMAND_FEEDBACK_DM_ONLY: '',
    COMMAND_FEEDBACK_MISSING_PERMISSION: '',
    COMMAND_FEEDBACK_MISSING_ARGS_SINGULAR: '',
    COMMAND_FEEDBACK_MISSING_ARGS_PLURAL: '',
  },
  permLevels: [
    { level: 0, name: 'User', check: () => true },
    {
      level: 1,
      name: 'Moderator',
      check: (message) =>
        message.member?.roles.cache.some((r) => r.name === 'Moderator'),
    },
    {
      level: 2,
      name: 'Administrator',
      check: (message) =>
        message.member?.roles.cache.some((r) => r.name === 'Administrator'),
    },
    {
      level: 3,
      name: 'Owner',
      check: (message) => message.author.id === owner,
    },
  ],
};

export const clientId = '908139862526406656';
export const testGuild = '683463960501944327';

export default config;

import { config as env } from 'dotenv';
env();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';
import { BotClient, defaultCommands } from 'sensum';
import { TextGenerator } from '@refabric/text';
import { LoaderFS } from '@refabric/loader';
import fs from 'fs/promises';
import path from 'path';

import config, { clientId, testGuild } from './config';
import { Logger } from './logging/logger';
import { connect } from './config/db';
import { IMilkshakeClient } from './interfaces';
import { Intents } from 'discord.js';

class App {
  public bot: IMilkshakeClient;
  public db: typeof import('mongoose');

  constructor() {
    this.bot = new BotClient(
      {
        ...config,
        root: __dirname,
      },
      {
        intents: [
          Intents.FLAGS.GUILDS,
          // Intents.FLAGS.GUILD_MEMBERS,
          Intents.FLAGS.GUILD_MESSAGES,
          // Intents.FLAGS.GUILD_PRESENCES,
          Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
          Intents.FLAGS.DIRECT_MESSAGES,
          Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
          // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        ],
      },
    ) as IMilkshakeClient;
    this.db = null!;
  }

  loadDefaultCommands() {
    for (const command of defaultCommands) {
      this.bot.loadCommand(command);
    }
  }

  async loadLanguageFeatures() {
    const loader = new LoaderFS({ root: __dirname, cwd: __dirname });
    const files = await loader.listContent('**/*.grammar');
    const grammars = await Promise.all(
      files.map((file) => fs.readFile(path.resolve(__dirname, file), 'utf-8')),
    );
    this.bot.brain = new TextGenerator(grammars.filter(Boolean) as string[]);
  }

  async registerSlashCommands() {
    const rest = new REST({ version: '9' }).setToken(this.bot.config.token);

    const slashCommands = this.bot.commands
      .filter((c) => !c.hidden && (!c.aliases?.includes('__noSlash') ?? true))
      .map((cmd) => {
        return new SlashCommandBuilder()
          .setName(cmd.name)
          .setDescription(cmd.description)
          .toJSON();
      });

    Logger.log(
      `Registering [${slashCommands.length}/${this.bot.commands.size}] slash commands...`,
    );

    await rest.put(Routes.applicationGuildCommands(clientId, testGuild), {
      body: slashCommands,
    });

    Logger.log('Successfully reloaded application slash commands.');
  }

  async run() {
    this.db = await connect();
    this.loadDefaultCommands();
    await this.loadLanguageFeatures();
    await this.bot.login(config.token);
    await this.registerSlashCommands();
  }
}

const app = new App();
app.run().catch((err) => {
  Logger.error(err);
  throw err;
});

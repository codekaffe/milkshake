import { SelectMenuInteraction } from 'discord.js';

import { IMilkshakeClient } from '../interfaces';
import { Menu } from './submenu-system';

export const fixture: Menu = {
  id: 'player-action',
  placeholder: 'Select an option',
  prompt: 'What are you going to do?',
  min: 1,
  max: 1,
  disabled: false,
  options: [
    {
      label: 'Move',
      value: 'move',
      description: 'Makes your character move somewhere.',
      emoji: '🏃‍♀️',
      submenu: {
        id: 'move',
        placeholder: 'Select an option',
        prompt: 'What kind of movement would you like to make?',
        min: 1,
        max: 1,
        disabled: false,
        options: [
          {
            label: 'Travel',
            value: 'travel',
            description: 'Travel to a new region.',
            emoji: '🎒',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've traveled!");
            },
          },
          {
            label: 'Explore Nearby',
            value: 'explore',
            description: 'Explore your surrounds for materials.',
            emoji: '🥦',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've explored!");
            },
          },
          {
            label: 'Return to Hometown',
            value: 'hometown',
            description: 'Returns to your hometown.',
            emoji: '🏘',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've returned to your hometown!");
            },
          }
        ],
      },
    },
    {
      label: 'Craft',
      value: 'craft',
      description: 'Open the crafting menu.',
      emoji: '🔨',
      submenu: {
        id: 'craft',
        placeholder: 'Select an option',
        prompt: 'What would you like to craft?',
        min: 1,
        max: 1,
        disabled: false,
        options: [
          {
            label: 'Craft Gear',
            value: 'gear',
            description: 'Craft a piece of gear.',
            emoji: '🛡',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've crafted gear!");
            },
          },
          {
            label: 'Craft Tool',
            value: 'tool',
            description: 'Craft a tool.',
            emoji: '🥦',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've crafted tool!");
            },
          },
          {
            label: 'Craft Material',
            value: 'material',
            description: 'Craft a material.',
            emoji: '🧱',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've crafted material!");
            },
          },
          {
            label: 'Craft Structure',
            value: 'structure',
            description: 'Craft a structure.',
            emoji: '🏠',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've crafted structure!");
            },
          },
          {
            label: 'Craft Spell',
            value: 'spell',
            description: 'Craft a spell.',
            emoji: '🔮',
            consumeMenu: true,
            async handler(
              bot: IMilkshakeClient,
              interaction: SelectMenuInteraction,
            ) {
              await interaction.reply("You've crafted spell!");
            },
          },
        ],
      },
    },
  ],
};

export const anotherFixture: Menu = {
  id: 'wow',
  placeholder: 'Select an option',
  options: [
    {
      label: 'Wow',
      value: 'wow',
      description: 'Wow!',
      emoji: '🤩',
      handler: async (
        bot: IMilkshakeClient,
        interaction: SelectMenuInteraction,
      ) => {},
    },
  ],
};

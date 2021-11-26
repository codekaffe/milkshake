import { inspect } from 'util';
import { Collection } from 'discord.js';

import { registerMenu } from './submenu-system';
import { fixture } from './fixtures';

describe('Select Menu System', () => {
  test('should parse a menu definition', () => {
    console.log(
      inspect(
        registerMenu({ menus: new Collection() } as any, fixture),
        false,
        6,
        true,
      ),
    );
  });
});

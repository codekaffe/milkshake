import { Flag } from '../flags/flag';
import { Goal } from '../world/goal';
import { World } from '../world/world';

export class Journey {
  goal: Goal;
  world: World;
  flags: Flag[];
  constructor(world: World, goal: Goal, flags: Flag[]) {
    this.goal = goal;
    this.world = world;
    this.flags = flags;
  }
}

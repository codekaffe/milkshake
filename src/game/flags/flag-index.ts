import { Flag, JourneyFlag, TimelineFlag, WorldFlag } from './flag';

import { DivineInterventionFlag } from './entry/divine-intervention.flag';
import { ReincarnationFlag } from './entry/reincarnation.flag';
import { TeleportationFlag } from './entry/teleportation.flag';
import { DeathExitFlag } from './exit/death-exit.flag';
import { GoalFulfilledFlag } from './exit/goal-fulfilled-exit.flag';
import { NoReturnExitFlag } from './exit/no-return-exit.flag';

class FlagIndex {
  public worldFlags: typeof WorldFlag[] = [];
  public journeyFlags: typeof JourneyFlag[] = [];
  public timelineFlags: typeof TimelineFlag[] = [];

  public allFlags: Record<string, typeof Flag> = {};

  register(flag: typeof Flag): void {
    this.allFlags[flag.selfName] = flag;
    if (flag instanceof WorldFlag || flag.prototype instanceof WorldFlag) {
      this.worldFlags.push(flag as any);
    } else if (
      flag instanceof JourneyFlag ||
      flag.prototype instanceof JourneyFlag
    ) {
      this.journeyFlags.push(flag as any);
    } else if (
      flag instanceof TimelineFlag ||
      flag.prototype instanceof TimelineFlag
    ) {
      this.timelineFlags.push(flag as any);
    }
  }
}

export const flagIndex = new FlagIndex();

flagIndex.register(DivineInterventionFlag);
flagIndex.register(ReincarnationFlag);
flagIndex.register(TeleportationFlag);
flagIndex.register(DeathExitFlag);
flagIndex.register(GoalFulfilledFlag);
flagIndex.register(NoReturnExitFlag);

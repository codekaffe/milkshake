import { JourneyFlag, JourneyFlagTypes } from '../flag';

export class GoalFulfilledFlag extends JourneyFlag {
  public static selfName = 'exit-goal';
  public static title = 'Return by Goal';
  public static description =
    'You return to the previous world by fulfilling your goal.';
  public static type = JourneyFlagTypes.EXIT;
  public static requirements = [];
  public static incompatible = [];
  public static allowMultipleWithinType = false;
  public static weight = 0;
}

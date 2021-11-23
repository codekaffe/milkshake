import { JourneyFlag, JourneyFlagTypes } from '../flag';

export class DeathExitFlag extends JourneyFlag {
  public static selfName = 'exit-death';
  public static title = 'Return by Death';
  public static description = 'You return to the previous world when you die.';
  public static type = JourneyFlagTypes.EXIT;
  public static requirements = [];
  public static incompatible = [];
  public static allowMultipleWithinType = false;
  public static weight = 0;
}

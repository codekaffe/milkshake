import { JourneyFlag, JourneyFlagTypes } from '../flag';

export class NoReturnExitFlag extends JourneyFlag {
  public static selfName = 'exit-death';
  public static title = 'No Return';
  public static description = "You die and it's over.";
  public static type = JourneyFlagTypes.EXIT;
  public static requirements = [];
  public static incompatible = [];
  public static allowMultipleWithinType = false;
  public static weight = 0;
}

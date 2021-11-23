import { JourneyFlag, JourneyFlagTypes } from '../flag';

export class ReincarnationFlag extends JourneyFlag {
  public static selfName = 'entry-reincarnation';
  public static title = 'Reincarnation';
  public static description = 'You enter the Isekai by reincarnating into it.';
  public static type = JourneyFlagTypes.ENTRY;
  public static requirements = [];
  public static incompatible = [];
  public static allowMultipleWithinType = false;
  public static weight = 0.69;
}

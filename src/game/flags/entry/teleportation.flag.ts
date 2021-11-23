import { JourneyFlag, JourneyFlagTypes } from '../flag';
import { ReincarnationFlag } from './reincarnation.flag';

export class TeleportationFlag extends JourneyFlag {
  public static selfName = 'entry-teleportation';
  public static title = 'Teleportation';
  public static description =
    'You enter the Isekai by getting teleported to it.';
  public static type = JourneyFlagTypes.ENTRY;
  public static requirements = [];
  public static incompatible = [ReincarnationFlag];
  public static allowMultipleWithinType = false;
  public static weight = 0.69;
}

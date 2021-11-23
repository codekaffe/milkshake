import { JourneyFlag, JourneyFlagTypes } from '../flag';

export class DivineInterventionFlag extends JourneyFlag {
  public static selfName = 'entry-divine-intervention-mod';
  public static title = 'Divine Intervention';
  public static description =
    'As you enter the Isekai you interact with a divine entity.';
  public static type = JourneyFlagTypes.ENTRY_MODIFIER;
  public static requirements = [];
  public static incompatible = [];
  public static allowMultipleWithinType = true;
  public static weight = 0.69;
}

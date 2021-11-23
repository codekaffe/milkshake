import { Flag } from '../flags/flag';

export abstract class Goal {
  public abstract readonly selfName: string;
  public abstract readonly description: string;
  public abstract readonly type: string;
  public abstract readonly requirements: typeof Flag[];
  public abstract readonly incompatible: typeof Flag[];
  public abstract readonly allowMultipleWithinType: boolean;
  public abstract readonly weight: number;
}

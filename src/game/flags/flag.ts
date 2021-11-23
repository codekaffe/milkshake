export abstract class Flag {
  public static readonly selfName: string;
  public static readonly title: string;
  public static readonly description: string;
  public static readonly type:
    | WorldFlagTypes
    | JourneyFlagTypes
    | TimelineFlagTypes;
  public static readonly requirements: typeof Flag[];
  public static readonly incompatible: typeof Flag[];
  public static readonly allowMultipleWithinType: boolean;
  public static readonly weight: number;
}

export abstract class WorldFlag extends Flag {
  public static readonly type: WorldFlagTypes;
}
export abstract class JourneyFlag extends Flag {
  public static readonly type: JourneyFlagTypes;
}
export abstract class TimelineFlag extends Flag {
  public static readonly type: TimelineFlagTypes;
}

export enum WorldFlagTypes {
  PARAMETER = 'PARAMETER',
  GEOPOLITICS = 'GEOPOLITICS',
  RELIGION = 'RELIGION',
  CULTURE = 'CULTURE',
  HISTORY = 'HISTORY',
  TECHNOLOGY = 'TECHNOLOGY',
  LAW = 'LAW',
  MONEY = 'MONEY',
}
export enum JourneyFlagTypes {
  ENTRY = 'ENTRY',
  ENTRY_MODIFIER = 'ENTRY_MODIFIER',
  EXIT = 'EXIT',
  EXIT_MODIFIER = 'EXIT_MODIFIER',
  PARAMETER = 'PARAMETER',
  BATTLE = 'BATTLE',
}
export enum TimelineFlagTypes {
  HISTORY = 'HISTORY',
  CONFLICT = 'CONFLICT',
  TECHNOLOGY = 'TECHNOLOGY',
}

export type GameFlag =
  | typeof WorldFlag
  | typeof JourneyFlag
  | typeof TimelineFlag;

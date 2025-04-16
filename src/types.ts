export enum Rarity {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  MYTHIC = "MYTHIC",
  LEGENDARY = "LEGENDARY",
  RELIC = "RELIC",
}

export enum BonusRarity {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  BIG = "BIG",
  AWESOME = "AWESOME",
}

export type FilterType = Rarity | "ALL";

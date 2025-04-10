export enum Rarity {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  MYTHIC = "MYTHIC",
  LEGENDARY = "LEGENDARY",
  RELIC = "RELIC",
}

export type FilterType = Rarity | "ALL";

import { Rarity } from "../types";

const RARITY_TRANSLATION_KEYS: Record<Rarity, string> = {
  [Rarity.COMMON]: "filter.common",
  [Rarity.UNCOMMON]: "filter.uncommon",
  [Rarity.RARE]: "filter.rare",
  [Rarity.EPIC]: "filter.epic",
  [Rarity.MYTHIC]: "filter.mythic",
  [Rarity.LEGENDARY]: "filter.legendary",
  [Rarity.RELIC]: "filter.relic",
};

export const rarityTranslationKey = (rarity: Rarity): string =>
  RARITY_TRANSLATION_KEYS[rarity];

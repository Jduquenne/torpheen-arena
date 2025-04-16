import { BonusItemEntry } from "../interfaces";
import { BonusRarity } from "../types";

export const bonusTable: BonusItemEntry[] = [
  {
    rarity: BonusRarity.SMALL,
    chance: 0.7,
    points: 2,
    image: "./assets/bonus/small.webp",
  },
  {
    rarity: BonusRarity.MEDIUM,
    chance: 0.2,
    points: 5,
    image: "./assets/bonus/medium.webp",
  },
  {
    rarity: BonusRarity.BIG,
    chance: 0.09,
    points: 10,
    image: "./assets/bonus/big.webp",
  },
  {
    rarity: BonusRarity.AWESOME,
    chance: 0.01,
    points: 20,
    image: "./assets/bonus/awesome.webp",
  },
];

import { BonusRarity, Rarity } from "./types";

export interface LootItem {
  id: string;
  nameKey: string;
  rarity: Rarity;
  image: string;
  chance: number;
}

export interface InventoryLootItem {
  loot: LootItem;
  count: number;
}

export interface BonusItem {
  id: string;
  rarity: BonusRarity;
  image: string;
  points: number;
  animationClass?: string;
  x: number;
  y: number;
}

export interface BonusItemEntry {
  rarity: BonusRarity;
  chance: number;
  points: number;
  image: string;
}

import { Rarity } from "./types";

export interface LootItem {
  id: string;
  nameKey: string;
  rarity: Rarity;
  image: string;
  chance: number;
}

export interface InventoryItem {
  id: string;
  nameKey: string;
  rarity: Rarity;
  image: string;
  count: number;
}

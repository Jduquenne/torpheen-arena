import { Rarity } from "./types";

export interface LootItem {
  id: string;
  name: string;
  rarity: Rarity;
  emoji: string;
  chance: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  rarity: Rarity;
  emoji: string;
  count: number;
}

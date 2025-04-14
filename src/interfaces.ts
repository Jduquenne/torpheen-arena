import { Rarity } from "./types";

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

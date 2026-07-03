import { InventoryLootItem, LootItem } from "../interfaces";

export const MAX_ACTION_POINTS = 20;

export interface PlayerData {
  actionPoints: number;
  inventory: InventoryLootItem[];
  day: string;
}

export const getTodayKey = () => new Date().toISOString().split("T")[0];

export function createFreshPlayerData(today: string = getTodayKey()): PlayerData {
  return {
    actionPoints: MAX_ACTION_POINTS,
    inventory: [],
    day: today,
  };
}

export function rolloverIfNewDay(
  data: PlayerData,
  today: string = getTodayKey()
): PlayerData {
  if (data.day.startsWith(today)) return data;
  return {
    ...data,
    actionPoints: MAX_ACTION_POINTS,
    day: today,
  };
}

export function addActionPoints(data: PlayerData, points: number): PlayerData {
  return {
    ...data,
    actionPoints: Math.min(data.actionPoints + points, MAX_ACTION_POINTS),
  };
}

export function resetActionPoints(data: PlayerData): PlayerData {
  return { ...data, actionPoints: MAX_ACTION_POINTS };
}

export function clearInventory(data: PlayerData): PlayerData {
  return { ...data, inventory: [] };
}

export function addLootToInventory(
  inventory: InventoryLootItem[],
  loot: LootItem
): InventoryLootItem[] {
  const existing = inventory.find((entry) => entry.loot.nameKey === loot.nameKey);
  if (!existing) return [...inventory, { loot, count: 1 }];

  return inventory.map((entry) =>
    entry.loot.nameKey === loot.nameKey
      ? { ...entry, count: entry.count + 1 }
      : entry
  );
}

export function spendPointAndAddLoot(
  data: PlayerData,
  loot: LootItem
): PlayerData | null {
  if (data.actionPoints <= 0) return null;
  return {
    ...data,
    actionPoints: data.actionPoints - 1,
    inventory: addLootToInventory(data.inventory, loot),
  };
}

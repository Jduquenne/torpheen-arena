import { lootTable } from "../data/lootTable";
import { LootItem } from "../interfaces";

// Fonction de tirage pondéré
export function generateLoot(): LootItem {
  const totalWeight = lootTable.reduce((sum, entry) => sum + entry.chance, 0);
  const rand = Math.random() * totalWeight;

  let sum = 0;
  for (const entry of lootTable) {
    sum += entry.chance;
    if (rand < sum) return entry;
  }

  return lootTable[0];
}

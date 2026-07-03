import { describe, expect, it } from "vitest";
import { generateLoot } from "./generateLoot";
import { lootTable } from "../data/lootTable";
import { Rarity } from "../types";

describe("generateLoot", () => {
  it("always returns an entry from the loot table", () => {
    for (let i = 0; i < 200; i++) {
      const loot = generateLoot();
      expect(lootTable).toContainEqual(loot);
    }
  });

  it("draws roughly proportionally to configured weights, aggregated by rarity", () => {
    const draws = 20000;
    const countsByRarity = new Map<Rarity, number>();
    for (let i = 0; i < draws; i++) {
      const loot = generateLoot();
      countsByRarity.set(loot.rarity, (countsByRarity.get(loot.rarity) ?? 0) + 1);
    }

    const totalWeight = lootTable.reduce((sum, entry) => sum + entry.chance, 0);
    const weightByRarity = new Map<Rarity, number>();
    for (const entry of lootTable) {
      weightByRarity.set(entry.rarity, (weightByRarity.get(entry.rarity) ?? 0) + entry.chance);
    }

    for (const [rarity, weight] of weightByRarity) {
      const expectedCount = (weight / totalWeight) * draws;
      const actualCount = countsByRarity.get(rarity) ?? 0;

      // Rarities with a tiny expected count (e.g. RELIC at ~0.05/14794 weight)
      // are too noisy for a tight percentage check -- just sanity-bound them.
      if (expectedCount < 30) {
        expect(actualCount).toBeLessThan(expectedCount * 10 + 20);
        continue;
      }

      expect(actualCount).toBeGreaterThan(expectedCount * 0.7);
      expect(actualCount).toBeLessThan(expectedCount * 1.3);
    }
  });
});

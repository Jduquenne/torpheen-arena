import { describe, expect, it } from "vitest";
import {
  MAX_ACTION_POINTS,
  addActionPoints,
  addLootToInventory,
  clearInventory,
  createFreshPlayerData,
  resetActionPoints,
  rolloverIfNewDay,
  spendPointAndAddLoot,
} from "./playerData";
import { LootItem } from "../interfaces";
import { Rarity } from "../types";

const makeLoot = (nameKey: string): LootItem => ({
  id: nameKey,
  nameKey,
  rarity: Rarity.COMMON,
  image: "img.webp",
  chance: 1,
});

describe("createFreshPlayerData", () => {
  it("starts with max action points and an empty inventory", () => {
    const data = createFreshPlayerData("2026-01-01");
    expect(data).toEqual({ actionPoints: MAX_ACTION_POINTS, inventory: [], day: "2026-01-01" });
  });
});

describe("addActionPoints", () => {
  it("adds points without exceeding the cap", () => {
    const data = createFreshPlayerData("2026-01-01");
    const almostFull = { ...data, actionPoints: MAX_ACTION_POINTS - 1 };
    expect(addActionPoints(almostFull, 5).actionPoints).toBe(MAX_ACTION_POINTS);
  });
});

describe("resetActionPoints", () => {
  it("sets action points back to the cap", () => {
    const data = { ...createFreshPlayerData("2026-01-01"), actionPoints: 0 };
    expect(resetActionPoints(data).actionPoints).toBe(MAX_ACTION_POINTS);
  });
});

describe("rolloverIfNewDay", () => {
  it("keeps the data untouched when the day has not changed", () => {
    const data = { ...createFreshPlayerData("2026-01-01"), actionPoints: 3 };
    expect(rolloverIfNewDay(data, "2026-01-01")).toBe(data);
  });

  it("resets action points and bumps the day when the day changed", () => {
    const data = { ...createFreshPlayerData("2026-01-01"), actionPoints: 3 };
    const rolled = rolloverIfNewDay(data, "2026-01-02");
    expect(rolled.actionPoints).toBe(MAX_ACTION_POINTS);
    expect(rolled.day).toBe("2026-01-02");
    expect(rolled.inventory).toBe(data.inventory);
  });
});

describe("addLootToInventory", () => {
  it("adds a new entry for a loot never seen before", () => {
    const inventory = addLootToInventory([], makeLoot("axe.a"));
    expect(inventory).toEqual([{ loot: makeLoot("axe.a"), count: 1 }]);
  });

  it("increments the count for a loot already owned", () => {
    const inventory = addLootToInventory(
      [{ loot: makeLoot("axe.a"), count: 1 }],
      makeLoot("axe.a")
    );
    expect(inventory).toEqual([{ loot: makeLoot("axe.a"), count: 2 }]);
  });
});

describe("spendPointAndAddLoot", () => {
  it("returns null when there are no action points left", () => {
    const data = { ...createFreshPlayerData("2026-01-01"), actionPoints: 0 };
    expect(spendPointAndAddLoot(data, makeLoot("axe.a"))).toBeNull();
  });

  it("decrements action points and adds the loot", () => {
    const data = createFreshPlayerData("2026-01-01");
    const updated = spendPointAndAddLoot(data, makeLoot("axe.a"));
    expect(updated?.actionPoints).toBe(MAX_ACTION_POINTS - 1);
    expect(updated?.inventory).toEqual([{ loot: makeLoot("axe.a"), count: 1 }]);
  });
});

describe("clearInventory", () => {
  it("empties the inventory without touching action points", () => {
    const data = {
      ...createFreshPlayerData("2026-01-01"),
      actionPoints: 5,
      inventory: [{ loot: makeLoot("axe.a"), count: 3 }],
    };
    expect(clearInventory(data)).toEqual({ ...data, inventory: [] });
  });
});

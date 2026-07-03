import { describe, expect, it } from "vitest";
import { rarityTranslationKey } from "./rarityLabel";
import { Rarity } from "../types";

describe("rarityTranslationKey", () => {
  it("maps every rarity to its own translation key", () => {
    const keys = Object.values(Rarity).map(rarityTranslationKey);
    expect(new Set(keys).size).toBe(Object.values(Rarity).length);
    for (const rarity of Object.values(Rarity)) {
      expect(rarityTranslationKey(rarity)).toBe(`filter.${rarity.toLowerCase()}`);
    }
  });
});

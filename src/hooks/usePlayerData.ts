// src/hooks/usePlayerData.ts
import { useEffect, useState } from "react";
import { simpleHash } from "../lib/hash";
import { xorEncrypt, xorDecrypt } from "../lib/crypto";
import { InventoryLootItem, LootItem } from "../interfaces";
import { initDB, getItem, setItem } from "../utils/useIndexedDB";

const STORAGE_KEY = "PLAYER_DATA_SECURE";
const SECRET = import.meta.env.VITE_ACTION_SECRET;
const CRYPTO_KEY = import.meta.env.VITE_ACTION_KEY;
const MAX_POINTS = 20;

const getTodayKey = () => new Date().toISOString().split("T")[0];

interface PlayerData {
  actionPoints: number;
  inventory: InventoryLootItem[];
  day: string;
}

export function usePlayerData() {
  const [data, setData] = useState<PlayerData | null>(null);
  const [locked, setLocked] = useState(false);

  const save = async (state: PlayerData) => {
    const { actionPoints, inventory, day } = state;
    const payload = { actionPoints, inventory, day };
    const checksum = simpleHash(SECRET + JSON.stringify(payload));
    const encrypted = xorEncrypt(
      JSON.stringify({ ...payload, checksum }),
      CRYPTO_KEY
    );

    await setItem(STORAGE_KEY, encrypted);
  };

  const load = async (): Promise<PlayerData | null> => {
    const today = getTodayKey();
    // ✅ Migration automatique une seule fois
    if (localStorage.getItem("PLAYER_DATA_MIGRATED") !== "1") {
      const legacy = localStorage.getItem(STORAGE_KEY);
      if (legacy) {
        await setItem(STORAGE_KEY, legacy); // écrit dans IndexedDB
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem("PLAYER_DATA_MIGRATED", "1");
      }
    }

    const raw = (await getItem<string>(STORAGE_KEY)) ?? null;
    if (!raw) {
      const fresh: PlayerData = {
        actionPoints: MAX_POINTS,
        inventory: [],
        day: today,
      };
      await save(fresh);
      return fresh;
    }

    try {
      const decrypted = xorDecrypt(raw, CRYPTO_KEY);
      const { actionPoints, inventory, day, checksum } = JSON.parse(decrypted);

      const valid =
        checksum ===
        simpleHash(SECRET + JSON.stringify({ actionPoints, inventory, day }));
      if (!valid) throw new Error("Invalid data");

      if (typeof day !== "string" || !day.startsWith(today)) {
        const resetDay: PlayerData = {
          actionPoints: MAX_POINTS,
          inventory,
          day: today,
        };
        await save(resetDay);
        return resetDay;
      }
      return { actionPoints, inventory, day };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    initDB();
    load().then((player) => {
      if (!player) {
        setLocked(true);
      } else {
        setData(player);
      }
    });
  }, []);

  const update = async (updated: PlayerData) => {
    setData(updated);
    await save(updated);
  };

  const addOneActionPoint = () => {
    if (!data || locked) return;
    const updated = {
      ...data,
      actionPoints: Math.min(data.actionPoints + 1, MAX_POINTS),
    };
    update(updated);
  };

  const addBonusActionPoint = (point: number) => {
    if (!data || locked) return;
    const updated = {
      ...data,
      actionPoints: Math.min(data.actionPoints + point, MAX_POINTS),
    };
    update(updated);
  };

  const hasActionPoints = !!data && data.actionPoints > 0;

  const spendPointAndAddItem = (loot: LootItem) => {
    if (!data || data.actionPoints <= 0 || locked) return false;

    const existing = data.inventory.find(
      (entry) => entry.loot.nameKey === loot.nameKey
    );

    const updatedInventory = existing
      ? data.inventory.map((entry) =>
          entry.loot.nameKey === loot.nameKey
            ? { ...entry, count: entry.count + 1 }
            : entry
        )
      : [...data.inventory, { loot, count: 1 }];

    const updated = {
      ...data,
      actionPoints: data.actionPoints - 1,
      inventory: updatedInventory,
    };

    update(updated);
    return true;
  };

  const resetActionPoints = () => {
    if (!data || locked) return;
    const updated = {
      ...data,
      actionPoints: MAX_POINTS,
    };
    update(updated);
  };

  const resetInventory = () => {
    if (!data || locked) return;
    const updated = {
      ...data,
      inventory: [],
    };
    update(updated);
  };

  return {
    actionPoints: data?.actionPoints ?? 0,
    inventory: data?.inventory ?? [],
    locked,
    addBonusActionPoint,
    spendPointAndAddItem,
    addOneActionPoint,
    hasActionPoints,
    resetActionPoints,
    resetInventory,
  };
}

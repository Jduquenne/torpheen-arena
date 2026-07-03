import { useEffect, useState } from "react";
import { LootItem } from "../interfaces";
import { initDB } from "../storage/indexedDb";
import { loadPlayerData, savePlayerData } from "../storage/playerDataStorage";
import {
  PlayerData,
  addActionPoints,
  clearInventory,
  getTodayKey,
  resetActionPoints as resetActionPointsData,
  rolloverIfNewDay,
  spendPointAndAddLoot,
} from "../domain/playerData";

export function usePlayerData() {
  const [data, setData] = useState<PlayerData | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    initDB();
    loadPlayerData().then((player) => {
      if (!player) {
        setLocked(true);
        return;
      }
      const rolled = rolloverIfNewDay(player, getTodayKey());
      if (rolled !== player) savePlayerData(rolled);
      setData(rolled);
    });
  }, []);

  const update = (updated: PlayerData) => {
    setData(updated);
    savePlayerData(updated);
  };

  const addOneActionPoint = () => {
    if (!data || locked) return;
    update(addActionPoints(data, 1));
  };

  const addBonusActionPoint = (point: number) => {
    if (!data || locked) return;
    update(addActionPoints(data, point));
  };

  const hasActionPoints = !!data && data.actionPoints > 0;

  const spendPointAndAddItem = (loot: LootItem) => {
    if (!data || locked) return false;
    const updated = spendPointAndAddLoot(data, loot);
    if (!updated) return false;
    update(updated);
    return true;
  };

  const resetActionPoints = () => {
    if (!data || locked) return;
    update(resetActionPointsData(data));
  };

  const resetInventory = () => {
    if (!data || locked) return;
    update(clearInventory(data));
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

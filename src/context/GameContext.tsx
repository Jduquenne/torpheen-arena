import { createContext, ReactNode, useContext, useState } from "react";
import { usePlayerData } from "../hooks/usePlayerData";
import { InventoryLootItem, LootItem } from "../interfaces";
import { FilterType } from "../types";

interface GameContextValue {
  actionPoints: number;
  inventory: InventoryLootItem[];
  locked: boolean;
  hasActionPoints: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  lastLoot?: LootItem;
  onLoot: (loot: LootItem) => void;
  addOneActionPoint: () => void;
  addBonusActionPoint: (points: number) => void;
  resetActionPoints: () => void;
  resetInventory: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const {
    actionPoints,
    inventory,
    locked,
    hasActionPoints,
    spendPointAndAddItem,
    addOneActionPoint,
    addBonusActionPoint,
    resetActionPoints,
    resetInventory,
  } = usePlayerData();

  const [filter, setFilter] = useState<FilterType>("ALL");
  const [lastLoot, setLastLoot] = useState<LootItem | undefined>(undefined);

  const onLoot = (loot: LootItem) => {
    spendPointAndAddItem(loot);
    setLastLoot(loot);
  };

  const value: GameContextValue = {
    actionPoints,
    inventory,
    locked,
    hasActionPoints,
    filter,
    setFilter,
    lastLoot,
    onLoot,
    addOneActionPoint,
    addBonusActionPoint,
    resetActionPoints,
    resetInventory,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

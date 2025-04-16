import { useEffect, useState } from "react";
import { usePlayerData } from "./hooks/usePlayerData";
import { useRandomBonusSpawn } from "./hooks/useRandomLootSpawn";

import { LootItem } from "./interfaces";
import { FilterType } from "./types";
import { InventoryGrid, HeaderBar, InventoryPagination, CustomCursor, FloatingBonus } from "./components";
import { useVersionCleanup } from "./hooks/useVersionCleanup";


function App() {
  // Check localstorage data by version
  useVersionCleanup({
    currentVersion: '1.1.0',
    obsoleteKeys: ['actionPointsSecure', 'inventorySecure'],
    renamedKeys: {
      'playerDataSecure': 'PLAYER_DATA_SECURE',
    }
  });
  const {
    actionPoints,
    inventory,
    locked,
    addBonusActionPoint,
    hasActionPoints,
    spendPointAndAddItem,
    addOneActionPoint,
    resetActionPoints,
    resetInventory,
  } = usePlayerData();
  const { bonus, collect } = useRandomBonusSpawn();

  const [lastLoot, setLastLoot] = useState<LootItem | undefined>(undefined);
  const [filter, setFilter] = useState<FilterType>("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const filteredInventory = (filter === "ALL"
    ? inventory
    : inventory.filter((item) => item.loot.rarity === filter)
  ).slice().reverse();

  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInventory.length / ITEMS_PER_PAGE)
  );

  const handleLoot = (loot: LootItem) => {
    spendPointAndAddItem(loot);
    setLastLoot(loot);
  };

  const handleBonusCollect = () => {
    const gained = collect();
    addBonusActionPoint(gained);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filter]);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          fontFamily: "sans-serif",
          textAlign: "center",
          top: 0,
        }}
      >
        <HeaderBar
          filter={filter}
          setFilter={setFilter}
          inventory={inventory}
          onLoot={handleLoot}
          actionPoints={actionPoints}
          hasActionPoint={hasActionPoints}
          lastLoot={lastLoot}
          resetInventory={resetInventory}
          resetActionPoints={resetActionPoints}
          addActionPoint={addOneActionPoint}
        />
        {locked && (
          <div className="warning">⚠️ Triche détectée : vous ne pouvez plus jouer aujourd'hui.</div>
        )}
        <InventoryGrid items={paginatedInventory} />
        <InventoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <CustomCursor />
      {bonus && <FloatingBonus key={bonus.id} item={bonus} onCollect={handleBonusCollect} />}
    </>
  );
}

export default App;
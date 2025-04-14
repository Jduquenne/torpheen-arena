import { useEffect, useState } from "react";
import { usePlayerData } from "./hooks/usePlayerData";
import { LootItem } from "./interfaces";
import { FilterType } from "./types";
import { InventoryGrid } from "./components";
import { HeaderBar } from "./components/HeaderBar";
import { InventoryPagination } from "./components/InventoryPagination";
import { CustomCursor } from "./components/CustomCursor";


function App() {
  const {
    actionPoints,
    inventory,
    locked,
    hasActionPoints,
    spendPointAndAddItem,
    addOneActionPoint,
    resetActionPoints,
    resetInventory,
  } = usePlayerData();

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
    </>
  );
}

export default App;
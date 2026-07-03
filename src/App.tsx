import { useState } from "react";

import { useGame } from "./context/GameContext";
import { useRandomBonusSpawn } from "./hooks/useRandomBonusSpawn";
import { useVersionCleanup } from "./hooks/useVersionCleanup";

import { InventoryGrid, HeaderBar, InventoryPagination, CustomCursor, FloatingBonus } from "./components";

function App() {
  // Check localstorage data by version
  useVersionCleanup({
    currentVersion: '1.1.1',
    obsoleteKeys: ['actionPointsSecure', 'inventorySecure'],
    renamedKeys: {
      'playerDataSecure': 'PLAYER_DATA_SECURE',
    }
  });
  const { inventory, locked, filter, addBonusActionPoint } = useGame();
  const { bonus, collect } = useRandomBonusSpawn();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const filteredInventory = (filter === "ALL"
    ? inventory
    : inventory.filter((item) => item.loot.rarity === filter)
  ).slice().reverse();

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInventory.length / ITEMS_PER_PAGE)
  );

  const clampedPage = Math.min(currentPage, totalPages);

  const paginatedInventory = filteredInventory.slice(
    (clampedPage - 1) * ITEMS_PER_PAGE,
    clampedPage * ITEMS_PER_PAGE
  );

  const handleBonusCollect = () => {
    const gained = collect();
    addBonusActionPoint(gained);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-start items-center font-sans text-center top-0">
        <HeaderBar />
        {locked && (
          <div className="warning">⚠️ Triche détectée : vous ne pouvez plus jouer aujourd'hui.</div>
        )}
        <InventoryGrid items={paginatedInventory} />
        <InventoryPagination
          currentPage={clampedPage}
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

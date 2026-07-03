import { useState } from "react";

import { useGame } from "./context/GameContext";
import { useRandomBonusSpawn } from "./hooks/useRandomBonusSpawn";
import { useVersionCleanup } from "./hooks/useVersionCleanup";

import { InventoryGrid, HeaderBar, InventoryPagination, CustomCursor, FloatingBonus, FilterBar } from "./components";

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
      <div className="min-h-screen w-full min-w-0 flex flex-col justify-start items-center font-sans text-center">
        <HeaderBar />
        <div className="w-full min-w-0 max-w-[1400px] flex flex-col items-center px-3 pb-52 sm:px-4 sm:pb-4">
          <FilterBar />
          {locked && (
            <div className="my-3 w-full max-w-xl rounded-lg border border-red-700 bg-red-900/80 px-4 py-2 text-sm text-red-100 sm:text-base">
              ⚠️ Triche détectée : vous ne pouvez plus jouer aujourd'hui.
            </div>
          )}
          <InventoryGrid items={paginatedInventory} />
          <InventoryPagination
            currentPage={clampedPage}
            totalPages={totalPages}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <CustomCursor />
      {bonus && <FloatingBonus key={bonus.id} item={bonus} onCollect={handleBonusCollect} />}
    </>
  );
}

export default App;

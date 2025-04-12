import { useEffect, useState } from "react";
import { useActionPoints } from "./hooks/useActionPoints";
import { useInventory } from "./hooks/useInventory";
import { LootItem } from "./interfaces";
import { FilterType } from "./types";
import { InventoryGrid } from "./components";
import { HeaderBar } from "./components/HeaderBar";
import { InventoryPagination } from "./components/InventoryPagination";


function App() {
  const { points, addPoint, usePoint, isDrawDisabled } = useActionPoints();
  const { inventory, addItem } = useInventory();

  const [lastLoot, setLastLoot] = useState<LootItem | undefined>(undefined);
  const [filter, setFilter] = useState<FilterType>("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const filteredInventory = (filter === "ALL"
    ? inventory
    : inventory.filter((item) => item.rarity === filter)
  ).slice().reverse();

  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInventory.length / ITEMS_PER_PAGE)
  );



  const resetPA = () => {
    localStorage.removeItem("actionPointsSecure");
    window.location.reload();
  };

  const resetInventory = () => {
    localStorage.removeItem("inventorySecure");
    window.location.reload();
  };

  const handleLoot = (loot: LootItem) => {
    addItem(loot);
    setLastLoot(loot);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filter]);

  return (
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
        usePoint={usePoint}
        points={points}
        disabled={isDrawDisabled}
        lastLoot={lastLoot}
        resetInventory={resetInventory}
        resetPA={resetPA}
        addPa={addPoint}
      />
      <InventoryGrid items={paginatedInventory} />
      <InventoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default App;
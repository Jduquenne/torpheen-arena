import { InventoryItem, LootItem } from "../interfaces";
import { FilterType } from "../types";
import { DrawButton } from "./DrawButton";
import { FilterBar } from "./FilterBar";
import "./style/HeaderBar.css";
import { LastLootDisplay } from "./LastLootDisplay";
import { DevTools } from "./DevTools";
import { ActionPoints } from "./ActionPoints";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface Props {
    filter: FilterType;
    setFilter: (r: FilterType) => void;
    inventory: InventoryItem[];
    onLoot: (item: LootItem) => void;
    points: number;
    usePoint: () => boolean;
    disabled?: boolean;
    lastLoot?: LootItem;
    resetPA: () => void;
    resetInventory: () => void;
    addPa: () => void;
}

export function HeaderBar({
    filter,
    setFilter,
    inventory,
    onLoot,
    usePoint,
    points,
    disabled = false,
    lastLoot,
    resetPA,
    resetInventory,
    addPa,

}: Props) {
    return (
        <header className="header-bar">
            <div className="header-blur" />

            <div className="header-content">
                <div className="header-top">
                    <h1 className="title">🎒 Mon Inventaire</h1>
                    <LanguageSwitcher />
                </div>


                <div className="main-actions">
                    <ActionPoints points={points} />

                    <DrawButton
                        points={points}
                        usePoint={usePoint}
                        onLoot={onLoot}
                        disabled={disabled}
                    />

                    {import.meta.env.VITE_DEV_MODE === "true" && (
                        <DevTools onResetPA={resetPA} onResetInventory={resetInventory} onAddPA={addPa} />
                    )}

                    {lastLoot && <LastLootDisplay loot={lastLoot} />}
                </div>

                <FilterBar
                    filter={filter}
                    setFilter={setFilter}
                    inventory={inventory}
                />
            </div>
        </header>
    );
}
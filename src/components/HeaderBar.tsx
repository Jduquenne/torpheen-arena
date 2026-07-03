import { InventoryLootItem, LootItem } from "../interfaces";
import { FilterType } from "../types";
import { DrawButton } from "./DrawButton";
import { FilterBar } from "./FilterBar";
import "../styles/HeaderBar.css";
import { LastLootDisplay } from "./LastLootDisplay";
import { DevTools } from "./DevTools";
import { ActionPoints } from "./ActionPoints";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface HearderBarProps {
    filter: FilterType;
    inventory: InventoryLootItem[];
    actionPoints: number;
    hasActionPoint: boolean;
    lastLoot?: LootItem;
    setFilter: (r: FilterType) => void;
    onLoot: (item: LootItem) => void;
    addActionPoint: () => void;
    resetActionPoints: () => void;
    resetInventory: () => void;
}

export function HeaderBar({
    filter,
    inventory,
    actionPoints,
    hasActionPoint,
    lastLoot,
    setFilter,
    onLoot,
    addActionPoint,
    resetActionPoints,
    resetInventory
}: HearderBarProps) {
    const { t } = useTranslation()
    return (
        <header className="header-bar">
            <div className="header-blur" />

            <div className="header-content">
                <div className="header-top">
                    <h1 className="title">{t('global.my_inventory')}</h1>
                    <LanguageSwitcher />
                </div>


                <div className="main-actions">
                    <ActionPoints actionPoints={actionPoints} />

                    <DrawButton
                        onLoot={onLoot}
                        hasActionPoint={hasActionPoint}
                    />

                    {import.meta.env.VITE_DEV_MODE === "true" && (
                        <DevTools onResetPA={resetActionPoints} onResetInventory={resetInventory} onAddPA={addActionPoint} />
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
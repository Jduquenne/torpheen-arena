import { LootItem } from "../interfaces";
import { rarityColor } from "./InventoryItemCard";
import "./style/LastLootDisplay.css"

export function LastLootDisplay({ loot }: { loot: LootItem | null }) {
    if (!loot) return null;

    return (
        <div className="last-loot">
            <span className="loot-emoji">{loot.emoji}</span>
            <span className="loot-name">{loot.name}</span>
            <span className="loot-rarity" style={{ color: rarityColor(loot.rarity) }}>
                {loot.rarity}
            </span>
        </div>
    );
}
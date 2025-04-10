import { InventoryItem } from "../interfaces";
import { Rarity } from "../types";
import "./style/InventoryItemCard.css"

export const rarityColor = (rarity: Rarity): string => {
    switch (rarity) {
        case Rarity.COMMON:
            return "gray";
        case Rarity.UNCOMMON:
            return "black";
        case Rarity.RARE:
            return "#00dd00";
        case Rarity.MYTHIC:
            return "orange";
        case Rarity.LEGENDARY:
            return "#ffff00";
        case Rarity.EPIC:
            return "#ff00ff";
        case Rarity.RELIC:
            return "#ff69B4";
        default:
            return "#000";
    }
};

export function InventoryItemCard({ item }: { item: InventoryItem }) {
    return (
        <div className="inventory-card">
            <div className="inventory-type">inventory</div>
            <div className="inventory-name">{item.name}</div>

            <div className="inventory-tags">
                <div className={`inventory-rarity inventory-rarity--${item.rarity.toLowerCase()}`}>
                    {item.rarity}
                </div>
            </div>

            <div className="inventory-visual">{item.emoji}</div>
        </div>
    );
}
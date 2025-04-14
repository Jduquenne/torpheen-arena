import { InventoryLootItem } from "../interfaces";
import { Rarity } from "../types";
import { useTranslation } from "react-i18next";
import "../styles/InventoryItemCard.css"

export const rarityColor = (rarity: Rarity): string => {
    switch (rarity) {
        case Rarity.COMMON:
            return "#9ca3af";
        case Rarity.UNCOMMON:
            return "#59c173";
        case Rarity.RARE:
            return "#3b82f6";
        case Rarity.MYTHIC:
            return "#d946ef";
        case Rarity.LEGENDARY:
            return "#f97316";
        case Rarity.EPIC:
            return "#8b5cf6";
        case Rarity.RELIC:
            return "#ffd700";
        default:
            return "#000";
    }
};

export function InventoryItemCard({ item }: { item: InventoryLootItem }) {
    const { t } = useTranslation();
    return (
        <div className="inventory-card">
            {item.count > 1 && (
                <div className={`inventory-quantity-bubble rarity--${item.loot.rarity.toLowerCase()}`}>x{item.count}</div>
            )}

            <div className="inventory-type">inventory</div>
            <div className="inventory-name">{t(item.loot.nameKey)}</div>

            <div className="inventory-tags">
                <div className={`inventory-rarity inventory-rarity--${item.loot.rarity.toLowerCase()}`}>
                    {item.loot.rarity}
                </div>
            </div>

            <div className="loot-image-wrapper">
                <img src={item.loot.image} alt="weapons" className="loot-image" />
            </div>
        </div>
    );
}
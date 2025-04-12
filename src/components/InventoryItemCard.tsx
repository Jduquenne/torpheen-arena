import { InventoryItem } from "../interfaces";
import { Rarity } from "../types";
import { useTranslation } from "react-i18next";
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

const rarityGlow: Record<Rarity, string> = {
    [Rarity.COMMON]: "var(--glow-common)",
    [Rarity.UNCOMMON]: "var(--glow-uncommon)",
    [Rarity.RARE]: "var(--glow-rare)",
    [Rarity.MYTHIC]: "var(--glow-mythic)",
    [Rarity.LEGENDARY]: "var(--glow-legendary)",
    [Rarity.EPIC]: "var(--glow-epic)",
    [Rarity.RELIC]: "var(--glow-relic)",
};

export function InventoryItemCard({ item }: { item: InventoryItem }) {
    const { t } = useTranslation();
    return (
        <div className="inventory-card">
            {item.count > 1 && (
                <div className="inventory-quantity-bubble">x{item.count}</div>
            )}

            <div className="inventory-type">inventory</div>
            <div className="inventory-name">{t(item.nameKey)}</div>

            <div className="inventory-tags">
                <div className={`inventory-rarity inventory-rarity--${item.rarity.toLowerCase()}`}>
                    {item.rarity}
                </div>
            </div>

            <div
                className="loot-image-wrapper"
                style={{ "--glow-color": rarityGlow[item.rarity] } as React.CSSProperties}
            >
                <img src={item.image} alt="weapons" className="loot-image" />
            </div>
        </div>
    );
}
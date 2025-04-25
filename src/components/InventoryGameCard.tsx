import { useTranslation } from 'react-i18next';
import { InventoryLootItem } from '../interfaces';
import '../styles/InventoryGameCard.css';
import { Rarity } from '../types';

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

export function InventoryGameCard({ item }: { item: InventoryLootItem }) {
    const { t } = useTranslation();

    return (
        <div className="card">
            {item.count > 1 && (
                <div className={`item-count inventory-rarity--${item.loot.rarity.toLowerCase()}`}>{item.count}</div>
            )}
            <img src={item.loot.image} className="artwork" />
            <div className="name-banner">{t(item.loot.nameKey)}</div>
            <div className="empty-slot">
                <span className={`rarity inventory-rarity--${item.loot.rarity.toLowerCase()}`}>{item.loot.rarity}</span>
            </div>
        </div>
    );
}

export default InventoryGameCard;
import { useTranslation } from 'react-i18next';
import { InventoryLootItem } from '../interfaces';
import '../styles/InventoryGameCard.css';
import { Rarity } from '../types';
import { rarityTranslationKey } from '../lib/rarityLabel';

export const rarityColor = (rarity: Rarity): string => {
    switch (rarity) {
        case Rarity.COMMON:
            return "var(--rarity-common)";
        case Rarity.UNCOMMON:
            return "var(--rarity-uncommon)";
        case Rarity.RARE:
            return "var(--rarity-rare)";
        case Rarity.MYTHIC:
            return "var(--rarity-mythic)";
        case Rarity.LEGENDARY:
            return "var(--rarity-legendary)";
        case Rarity.EPIC:
            return "var(--rarity-epic)";
        case Rarity.RELIC:
            return "var(--rarity-relic)";
        default:
            return "var(--rarity-common)";
    }
};

export function InventoryGameCard({ item }: { item: InventoryLootItem }) {
    const { t } = useTranslation();
    const rarityClass = `inventory-rarity--${item.loot.rarity.toLowerCase()}`;

    return (
        <div className={`card ${rarityClass}`}>
            {item.count > 1 && (
                <div className="item-count">{item.count}</div>
            )}
            <div className="artwork-frame">
                <img src={item.loot.image} className="artwork" alt={t(item.loot.nameKey)} />
            </div>
            <div className="name-banner">{t(item.loot.nameKey)}</div>
            <div className="empty-slot">
                <span className={`rarity ${rarityClass}`}>{t(rarityTranslationKey(item.loot.rarity))}</span>
            </div>
        </div>
    );
}

export default InventoryGameCard;

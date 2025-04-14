import { useTranslation } from 'react-i18next';
import { InventoryLootItem } from '../interfaces';
import './style/InventoryGameCard.css';

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
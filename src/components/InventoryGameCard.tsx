import { useTranslation } from 'react-i18next';
import { InventoryItem } from '../interfaces';
import './style/InventoryGameCard.css';

export function InventoryGameCard({ item }: { item: InventoryItem }) {
    const { t } = useTranslation();

    return (
        <div className="card">
            {item.count > 1 && (
                <div className={`item-count inventory-rarity--${item.rarity.toLowerCase()}`}>{item.count}</div>
            )}
            <img src={item.image} className="artwork" />
            <div className="name-banner">{t(item.nameKey)}</div>
            <div className="empty-slot">
                <span className={`rarity inventory-rarity--${item.rarity.toLowerCase()}`}>{item.rarity}</span>
            </div>
        </div>
    );
}

export default InventoryGameCard;
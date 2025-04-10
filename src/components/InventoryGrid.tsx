import { InventoryItem } from "../interfaces";
import { InventoryItemCard } from "./InventoryItemCard";
import "./style/InventoryGrid.css";

export function InventoryGrid({ items }: { items: InventoryItem[] }) {
    if (items.length === 0) return <p>Tu n'as encore rien gagné...</p>;

    return (
        <div className="inventory-grid">
            {items.map((item, index) => (
                <InventoryItemCard key={index} item={item} />
            ))}
        </div>
    );
}
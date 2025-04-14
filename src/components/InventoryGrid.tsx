import { InventoryItem } from "../interfaces";
import { InventoryGameCard } from "./InventoryGameCard";
import "./style/InventoryGrid.css";

export function InventoryGrid({ items }: { items: InventoryItem[] }) {
    if (items.length === 0) return <p>Tu n'as encore rien gagné...</p>;

    return (
        <div className="inventory-grid">
            {items.map((item, index) => (
                <InventoryGameCard key={index} item={item} />
            ))}
        </div>
    );
}
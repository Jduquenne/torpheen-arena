import { useEffect, useState } from "react";
import { LootItem } from "../interfaces";
import { rarityColor } from "./InventoryItemCard";
import "./style/LastLootDisplay.css";

export function LastLootDisplay({ loot }: { loot: LootItem | null }) {
    const [visible, setVisible] = useState(false);
    const [internalLoot, setInternalLoot] = useState<LootItem | null>(null);

    useEffect(() => {
        if (loot) {
            setVisible(false);
            setInternalLoot(loot);
            const appearTimeout = setTimeout(() => setVisible(true), 100);
            const disappearTimeout = setTimeout(() => {
                setVisible(false);
                setTimeout(() => setInternalLoot(null), 400); // délai pour laisser l'animation de disparition
            }, 3100);

            return () => {
                clearTimeout(appearTimeout);
                clearTimeout(disappearTimeout);
            };
        }
    }, [loot]);

    if (!internalLoot) return null;

    return (
        <div className={`last-loot-card ${visible ? "show" : ""}`}>
            <div className="last-loot-glow" style={{ background: rarityColor(internalLoot.rarity) }} />
            <div className="last-loot-content">
                <div className="last-loot-image">
                    <img src={internalLoot.image} alt="weapon" />
                </div>
                <div className="last-loot-details">
                    <div className="last-loot-name">{internalLoot.nameKey}</div>
                    <div
                        className="last-loot-rarity"
                        style={{ color: rarityColor(internalLoot.rarity) }}
                    >
                        {internalLoot.rarity}
                    </div>
                </div>
            </div>
        </div>
    );
}
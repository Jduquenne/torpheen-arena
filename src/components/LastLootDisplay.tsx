import { useEffect, useState } from "react";
import { LootItem } from "../interfaces";
import { rarityColor } from "./InventoryGameCard";

import "../styles/LastLootDisplay.css";
import { useTranslation } from "react-i18next";
import { rarityTranslationKey } from "../lib/rarityLabel";
import { useGame } from "../context/GameContext";

export function LastLootDisplay() {
    const { t } = useTranslation();
    const { lastLoot: loot } = useGame();

    const [visible, setVisible] = useState(false);
    const [internalLoot, setInternalLoot] = useState<LootItem | null>(null);

    useEffect(() => {
        if (loot) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- drives a CSS transition (mount hidden, then reveal) via setTimeout, not derivable from render
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

    const accentColor = rarityColor(internalLoot.rarity);

    return (
        <div
            className={`last-loot-card ${visible ? "show" : ""}`}
            style={{ borderColor: accentColor, boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 16px -3px ${accentColor}` }}
        >
            <div className="last-loot-glow" style={{ background: accentColor }} />
            <div className="last-loot-content">
                <div className="last-loot-image" style={{ borderColor: accentColor }}>
                    <img src={internalLoot.image} alt={t(internalLoot.nameKey)} />
                </div>
                <div className="last-loot-details">
                    <div className="last-loot-name">{t(internalLoot.nameKey)}</div>
                    <div
                        className="last-loot-rarity"
                        style={{ color: accentColor }}
                    >
                        {t(rarityTranslationKey(internalLoot.rarity))}
                    </div>
                </div>
            </div>
        </div>
    );
}

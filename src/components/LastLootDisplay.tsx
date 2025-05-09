import { useEffect, useState } from "react";
import { LootItem } from "../interfaces";
import { rarityColor } from "./InventoryGameCard";

import "../styles/LastLootDisplay.css";
import { useTranslation } from "react-i18next";
import { Rarity } from "../types";

export function LastLootDisplay({ loot }: { loot: LootItem | null }) {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(false);
    const [internalLoot, setInternalLoot] = useState<LootItem | null>(null);

    const getRarityLabelByLootRarity = (lootRarity: Rarity) => {
        switch (lootRarity) {
            case Rarity.COMMON:
                return t('filter.common')
            case Rarity.UNCOMMON:
                return t('filter.uncommon')
            case Rarity.RARE:
                return t('filter.rare')
            case Rarity.EPIC:
                return t('filter.epic')
            case Rarity.MYTHIC:
                return t('filter.mythic')
            case Rarity.LEGENDARY:
                return t('filter.common')
            case Rarity.RELIC:
                return t('filter.common')
            default:
                break
        }
    }

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
                    <div className="last-loot-name">{t(internalLoot.nameKey)}</div>
                    <div
                        className="last-loot-rarity"
                        style={{ color: rarityColor(internalLoot.rarity) }}
                    >
                        {getRarityLabelByLootRarity(internalLoot.rarity)}
                    </div>
                </div>
            </div>
        </div>
    );
}
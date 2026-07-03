import { useState } from "react";
import { generateLoot } from "../lib/generateLoot";
import "../styles/DrawButton.css";
import { useTranslation } from "react-i18next";
import { useGame } from "../context/GameContext";

export function DrawButton() {
    const { t } = useTranslation()
    const { onLoot, hasActionPoints } = useGame();
    const [cooldown, setCooldown] = useState(false);

    const handleClick = () => {
        if (!hasActionPoints || cooldown) return;

        const loot = generateLoot();
        onLoot(loot);
        setCooldown(true);
        setTimeout(() => setCooldown(false), 500);
    };

    return (
        <button
            onClick={handleClick}
            disabled={!hasActionPoints || cooldown}
            className="draw-button"
        >
            {hasActionPoints ? (t('global.spin_the_roulette')) : (t('global.back_tomorrow'))}
        </button>
    );
}
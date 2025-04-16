import { useState } from "react";
import { generateLoot } from "../lib/generateLoot";
import { LootItem } from "../interfaces";
import "../styles/DrawButton.css";

interface Props {
    onLoot: (item: LootItem) => void;
    hasActionPoint?: boolean;
}

export function DrawButton({ onLoot, hasActionPoint = true }: Props) {
    const [cooldown, setCooldown] = useState(false);

    const handleClick = () => {
        if (!hasActionPoint || cooldown) return;

        const loot = generateLoot();
        onLoot(loot);
        setCooldown(true);
        setTimeout(() => setCooldown(false), 500);
    };

    return (
        <button
            onClick={handleClick}
            disabled={!hasActionPoint || cooldown}
            className="draw-button"
        >
            {hasActionPoint ? ("Tourne la roulette !") : ("Reviens demain !")}
        </button>
    );
}
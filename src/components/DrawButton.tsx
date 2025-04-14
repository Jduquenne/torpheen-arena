import { useState } from "react";
import { generateLoot } from "../lib/generateLoot";
import { LootItem } from "../interfaces";
import "./style/DrawButton.css"; // 💅 nouveau fichier CSS

interface Props {
    points: number;
    usePoint: () => boolean;
    onLoot: (item: LootItem) => void;
    disabled?: boolean;
}

export function DrawButton({ points, usePoint, onLoot, disabled = false }: Props) {
    const [cooldown, setCooldown] = useState(false);

    const handleClick = () => {
        if (disabled || cooldown) return;

        const success = usePoint();
        if (!success) {
            alert("😴 Pas assez de points !");
            return;
        }

        const loot = generateLoot();
        onLoot(loot);
        setCooldown(true);
        setTimeout(() => setCooldown(false), 1000);
    };

    return (
        <button
            onClick={handleClick}
            disabled={points <= 0 || disabled || cooldown}
            className="draw-button"
        >
            {disabled ? ("Reviens demain !") : ("Tourne la roulette !")}
        </button>
    );
}
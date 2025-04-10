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
    const handleClick = () => {
        if (disabled) return;
        const success = usePoint();
        if (!success) {
            alert("😴 Pas assez de points !");
            return;
        }

        const loot = generateLoot();
        onLoot(loot);
    };

    return (
        <button
            className="draw-button"
            onClick={handleClick}
            disabled={points <= 0 || disabled}
        >
            {disabled ? "Reviens demain"! : "🎲 Tirer dans la roulotte"}
        </button>
    );
}
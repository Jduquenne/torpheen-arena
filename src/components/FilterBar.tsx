import { InventoryLootItem } from "../interfaces";
import { FilterType, Rarity } from "../types";
import "../styles/FilterBar.css"
import { useSound } from "../context/SoundContext";

interface FilterBarProps {
    filter: FilterType;
    setFilter: (r: FilterType) => void;
    inventory: InventoryLootItem[];
}

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
    { label: "Tous", value: "ALL" },
    { label: "Commun", value: Rarity.COMMON },
    { label: "Inhabituel", value: Rarity.UNCOMMON },
    { label: "Rare", value: Rarity.RARE },
    { label: "Mythique", value: Rarity.MYTHIC },
    { label: "Légendaire", value: Rarity.LEGENDARY },
    { label: "Épique", value: Rarity.EPIC },
    { label: "Relique", value: Rarity.RELIC },
];

export function FilterBar({ filter, setFilter, inventory }: FilterBarProps) {
    const { play } = useSound()
    const getCount = (type: FilterType) => {
        if (type === "ALL") return inventory.length;
        return inventory.filter((item) => item.loot.rarity === type).length;
    };

    const onClickActions = (optValue: FilterType) => {
        setFilter(optValue)
        play('select')
    }

    return (
        <div className="filter-bar">
            {FILTER_OPTIONS.map((opt) => (
                <button
                    key={opt.value}
                    className={`filter-btn ${filter === opt.value ? "active" : ""} rarity-${opt.value.toString().toLowerCase()}`}
                    onClick={() => onClickActions(opt.value,)}
                >
                    <span className="label">{opt.label}</span>
                    <span className="badge">{getCount(opt.value)}</span>
                </button>
            ))}
        </div>
    );
}
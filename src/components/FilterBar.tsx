import { FilterType, Rarity } from "../types";
import "./style/FilterBar.css"

interface Props {
    filter: FilterType;
    setFilter: (r: FilterType) => void;
    inventory: { rarity: Rarity }[];
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

export function FilterBar({ filter, setFilter, inventory }: Props) {
    const getCount = (type: FilterType) => {
        if (type === "ALL") return inventory.length;
        return inventory.filter((item) => item.rarity === type).length;
    };

    return (
        <div className="filter-bar">
            {FILTER_OPTIONS.map((opt) => (
                <button
                    key={opt.value}
                    className={`filter-btn ${filter === opt.value ? "active" : ""} rarity-${opt.value.toString().toLowerCase()}`}
                    onClick={() => setFilter(opt.value)}
                >
                    <span className="label">{opt.label}</span>
                    <span className="badge">{getCount(opt.value)}</span>
                </button>
            ))}
        </div>
    );
}
import { InventoryLootItem } from "../interfaces";
import { FilterType, Rarity } from "../types";
import "../styles/FilterBar.css"
import { useSound } from "../context/SoundContext";
import { useTranslation } from "react-i18next";

interface FilterBarProps {
    filter: FilterType;
    setFilter: (r: FilterType) => void;
    inventory: InventoryLootItem[];
}

export function FilterBar({ filter, setFilter, inventory }: FilterBarProps) {
    const { play } = useSound()
    const { t } = useTranslation()
    const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
        { label: t('filter.all'), value: "ALL" },
        { label: t('filter.common'), value: Rarity.COMMON },
        { label: t('filter.uncommon'), value: Rarity.UNCOMMON },
        { label: t('filter.rare'), value: Rarity.RARE },
        { label: t('filter.mythic'), value: Rarity.MYTHIC },
        { label: t('filter.legendary'), value: Rarity.LEGENDARY },
        { label: t('filter.epic'), value: Rarity.EPIC },
        { label: t('filter.relic'), value: Rarity.RELIC },
    ];

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
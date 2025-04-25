import { useEffect, useState } from "react";
import { bonusTable } from "../data/bonusTable";
import { BonusItem } from "../interfaces";

const getRandomFromRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const chooseRarity = () => {
  const roll = Math.random();
  let sum = 0;
  for (const loot of bonusTable) {
    sum += loot.chance;
    if (roll <= sum) return loot;
  }
  return bonusTable[0];
};

export function useRandomBonusSpawn(intervalMin = 30, intervalMax = 120) {
  const [bonus, setBonus] = useState<BonusItem | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const spawnLoot = () => {
      const loot = chooseRarity();
      const iconSize = 200;
      const side = Math.random() < 0.5 ? "left" : "right";
      const offset =
        side === "left"
          ? getRandomFromRange(40, 100)
          : getRandomFromRange(0, 40);
      let sideClass = "";
      sideClass = side === "left" ? "roll-in-left" : "roll-in-right";
      const x =
        side === "left" ? offset : window.innerWidth - iconSize - offset;

      const maxY = window.innerHeight + window.scrollY - iconSize - offset;
      const y = getRandomFromRange(window.scrollY + offset, maxY);

      setBonus({
        id: Date.now().toString(),
        rarity: loot.rarity,
        image: loot.image,
        points: loot.points,
        animationClass: sideClass,
        x,
        y,
      });

      timeout = setTimeout(
        spawnLoot,
        getRandomFromRange(intervalMin, intervalMax) * 1000
      );
    };

    timeout = setTimeout(
      spawnLoot,
      getRandomFromRange(intervalMin, intervalMax) * 1000
    );
    return () => clearTimeout(timeout);
  }, [intervalMin, intervalMax]);

  const collect = () => {
    const pts = bonus?.points || 0;
    setBonus(null);
    return pts;
  };

  return { bonus, collect };
}

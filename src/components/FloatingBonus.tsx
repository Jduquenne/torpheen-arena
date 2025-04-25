import { useEffect } from 'react';
import { useSound } from '../context/SoundContext';
import { BonusItem } from '../interfaces';
import '../styles/FloatingBonus.css';

interface FloatingBonusProps {
    item: BonusItem;
    onCollect: (points: number) => void;
}

export const FloatingBonus = ({ item, onCollect }: FloatingBonusProps) => {
    const { play } = useSound()

    useEffect(() => {
        play('bonus')
    }, [])

    const handleClick = () => {
        onCollect(item.points);
    };

    return (
        <img
            src={item.image}
            alt={item.rarity + ' bonus'}
            className={`floating-bonus ${item.rarity} ${item.animationClass ?? ''}`}
            style={{ top: item.y, left: item.x }}
            onClick={handleClick}
        />
    );
};
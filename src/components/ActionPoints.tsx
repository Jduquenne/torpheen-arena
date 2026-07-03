import "../styles/ActionPoints.css";
import { useGame } from "../context/GameContext";

export function ActionPoints() {
    const { actionPoints } = useGame();
    const getClassByPoints = () => {
        if (actionPoints === 0) return "empty";
        if (actionPoints <= 3) return "low";
        return "normal";
    };
    return (
        <div className={`action-points-container ${getClassByPoints()}`}>
            <span className="action-icon">⚡</span>
            <span className="action-text">{actionPoints}</span>
        </div>
    );
}
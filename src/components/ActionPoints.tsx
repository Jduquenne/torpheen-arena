import "../styles/ActionPoints.css";
interface Props {
    actionPoints: number;
}

export function ActionPoints({ actionPoints }: Props) {
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
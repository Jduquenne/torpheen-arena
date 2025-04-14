import "./style/ActionPoints.css";
interface Props {
    points: number;
}

export function ActionPoints({ points }: Props) {
    const getClassByPoints = () => {
        if (points === 0) return "empty";
        if (points <= 3) return "low";
        return "normal";
    };
    return (
        <div className={`action-points-container ${getClassByPoints()}`}>
            <span className="action-icon">⚡</span>
            <span className="action-text">{points}</span>
        </div>
    );
}
interface Props {
    points: number;
}

export function ActionPoints({ points }: Props) {
    const getClassName = () => {
        if (points <= 0) return "action-points empty";
        if (points < 5) return "action-points low";
        return "action-points ok";
    };

    return (
        <div className={getClassName()}>
            ⚡ {points} coup{points > 1 ? "s" : ""} restant{points > 1 ? "s" : ""}
        </div>
    );
}
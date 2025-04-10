import "./style/DevTools.css";

interface Props {
    onResetPA: () => void;
    onResetInventory: () => void;
    onAddPA: () => void;
}

export function DevTools({ onResetPA, onResetInventory, onAddPA }: Props) {
    return (
        <div className="devtools">
            <details>
                <summary>🛠 DevTools</summary>
                <button onClick={onResetPA}>🔄 Reset PA</button>
                <button onClick={onResetInventory}>🧹 Reset Inventaire</button>
                <button onClick={onAddPA}>➕ +1 Point d'action</button>
            </details>
        </div>
    );
}
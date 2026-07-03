import "../styles/DevTools.css";
import { useGame } from "../context/GameContext";

export function DevTools() {
    const { resetActionPoints, resetInventory, addOneActionPoint } = useGame();
    return (
        <div className="devtools">
            <details>
                <summary>🛠 DevTools</summary>
                <button onClick={resetActionPoints}>🔄 Reset PA</button>
                <button onClick={resetInventory}>🧹 Reset Inventaire</button>
                <button onClick={addOneActionPoint}>➕ +1 Point d'action</button>
            </details>
        </div>
    );
}
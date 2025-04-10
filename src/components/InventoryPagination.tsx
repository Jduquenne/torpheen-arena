interface Props {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export function InventoryPagination({ currentPage, totalPages, onChange }: Props) {
    return (
        <div style={{ margin: "1rem 0", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
            <button
                onClick={() => onChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ◀️ Précédent
            </button>
            <span>
                Page {currentPage} / {totalPages}
            </span>
            <button
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Suivant ▶️
            </button>
        </div>
    );
}
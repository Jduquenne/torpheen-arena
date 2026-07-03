import { useTranslation } from "react-i18next";

interface Props {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export function InventoryPagination({ currentPage, totalPages, onChange }: Props) {
    const { t } = useTranslation()
    return (
        <div style={{ margin: "1rem 0", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
            <button
                onClick={() => onChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ◀️ {t('global.previous')}
            </button>
            <span>
                {t('global.page')} {currentPage} / {totalPages}
            </span>
            <button
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {t('global.next')} ▶️
            </button>
        </div>
    );
}
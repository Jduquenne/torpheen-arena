import { useTranslation } from "react-i18next";

interface Props {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export function InventoryPagination({ currentPage, totalPages, onChange }: Props) {
    const { t } = useTranslation()
    return (
        <div className="my-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
                className="rounded-lg border border-slate-600 bg-[var(--bg-button)] px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:enabled:border-[var(--accent-yellow)] hover:enabled:bg-[var(--bg-button-hover)] disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
                onClick={() => onChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ◀️ {t('global.previous')}
            </button>
            <span className="font-[var(--font-display)] text-sm text-slate-200 sm:text-base">
                {t('global.page')} {currentPage} / {totalPages}
            </span>
            <button
                className="rounded-lg border border-slate-600 bg-[var(--bg-button)] px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:enabled:border-[var(--accent-yellow)] hover:enabled:bg-[var(--bg-button-hover)] disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {t('global.next')} ▶️
            </button>
        </div>
    );
}
import "../styles/HeaderBar.css";
import { DrawButton } from "./DrawButton";
import { LastLootDisplay } from "./LastLootDisplay";
import { DevTools } from "./DevTools";
import { ActionPoints } from "./ActionPoints";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function HeaderBar() {
    const { t } = useTranslation()
    return (
        <>
            <header className="main-menu">
                <div className="main-menu-top">
                    <span className="header-icon" aria-hidden="true">🎒</span>
                    <h1 className="header-title">{t('global.my_inventory')}</h1>
                    <LanguageSwitcher />
                </div>

                <div className="main-menu-actions">
                    <ActionPoints />
                    <DrawButton />
                </div>

                {import.meta.env.VITE_DEV_MODE === "true" && <DevTools />}
            </header>

            <LastLootDisplay />
        </>
    );
}

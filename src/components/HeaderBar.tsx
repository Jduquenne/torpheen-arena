import "../styles/HeaderBar.css";
import { DrawButton } from "./DrawButton";
import { FilterBar } from "./FilterBar";
import { LastLootDisplay } from "./LastLootDisplay";
import { DevTools } from "./DevTools";
import { ActionPoints } from "./ActionPoints";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function HeaderBar() {
    const { t } = useTranslation()
    return (
        <header className="header-bar">
            <div className="header-blur" />

            <div className="header-content">
                <div className="header-top">
                    <h1 className="title">{t('global.my_inventory')}</h1>
                    <LanguageSwitcher />
                </div>


                <div className="main-actions">
                    <ActionPoints />

                    <DrawButton />

                    {import.meta.env.VITE_DEV_MODE === "true" && <DevTools />}

                    <LastLootDisplay />
                </div>

                <FilterBar />
            </div>
        </header>
    );
}

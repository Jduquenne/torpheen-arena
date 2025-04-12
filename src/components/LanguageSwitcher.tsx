import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./style/LanguageSwitcher.css";

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const toggleLang = (lng: string) => {
        i18n.changeLanguage(lng);
        setOpen(false);
    };

    return (
        <div className="language-switcher">
            <button
                className="language-toggle"
                onClick={() => setOpen((prev) => !prev)}
            >
                🌐 {i18n.language.toUpperCase()}
            </button>

            {open && (
                <div className="language-options">
                    <button onClick={() => toggleLang("fr")}>Français</button>
                    <button onClick={() => toggleLang("en")}>English</button>
                </div>
            )}
        </div>
    );
}

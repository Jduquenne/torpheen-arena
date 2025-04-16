import { useEffect } from "react";

interface VersionCleanupOptions {
  currentVersion: string;
  obsoleteKeys?: string[];
  renamedKeys?: { [oldKey: string]: string };
}

export function useVersionCleanup({
  currentVersion,
  obsoleteKeys = [],
  renamedKeys = {},
}: VersionCleanupOptions) {
  useEffect(() => {
    const storedVersion = localStorage.getItem("APP_VERSION");

    if (storedVersion !== currentVersion) {
      // Supprimer les anciennes clés
      obsoleteKeys.forEach((key) => {
        localStorage.removeItem(key);
      });

      // Renommer les clés si nécessaire
      Object.entries(renamedKeys).forEach(([oldKey, newKey]) => {
        const data = localStorage.getItem(oldKey);
        if (data !== null) {
          localStorage.setItem(newKey, data);
          localStorage.removeItem(oldKey);
        }
      });

      // Mettre à jour la version stockée
      localStorage.setItem("APP_VERSION", currentVersion);
    }
  }, [currentVersion, obsoleteKeys, renamedKeys]);
}

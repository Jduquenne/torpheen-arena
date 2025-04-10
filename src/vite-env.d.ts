/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_INVENTORY_SECRET: string;
  readonly VITE_INVENTORY_KEY: string;
  readonly VITE_ACTION_SECRET: string;
  readonly VITE_ACTION_KEY: string;
  readonly VITE_DEV_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

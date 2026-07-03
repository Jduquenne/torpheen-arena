import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "torpheen_arena";
const DB_VERSION = 1;
const STORE_NAME = "game_data";

let dbPromise: Promise<IDBPDatabase>;

export function initDB() {
  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  const db = await dbPromise;
  await db.put(STORE_NAME, value, key);
}

export async function getItem<T>(key: string): Promise<T | undefined> {
  const db = await dbPromise;
  return await db.get(STORE_NAME, key);
}

export async function deleteItem(key: string): Promise<void> {
  const db = await dbPromise;
  await db.delete(STORE_NAME, key);
}

export async function clearStore(): Promise<void> {
  const db = await dbPromise;
  await db.clear(STORE_NAME);
}

export async function getAllKeys(): Promise<string[]> {
  const db = await dbPromise;
  return (await db.getAllKeys(STORE_NAME)).filter(
    (k): k is string => typeof k === "string"
  );
}

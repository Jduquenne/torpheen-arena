import { simpleHash } from "../lib/hash";
import { xorDecrypt } from "../lib/crypto";
import { getItem, setItem } from "./indexedDb";
import { PlayerData, createFreshPlayerData } from "../domain/playerData";

const STORAGE_KEY = "PLAYER_DATA_SECURE";
const LEGACY_SECRET = import.meta.env.VITE_ACTION_SECRET;
const LEGACY_CRYPTO_KEY = import.meta.env.VITE_ACTION_KEY;

function migrateLegacyLocalStorageEntry() {
  if (localStorage.getItem("PLAYER_DATA_MIGRATED") === "1") return;

  const legacy = localStorage.getItem(STORAGE_KEY);
  if (legacy) {
    setItem(STORAGE_KEY, legacy);
    localStorage.removeItem(STORAGE_KEY);
  }
  localStorage.setItem("PLAYER_DATA_MIGRATED", "1");
}

// Player saves were previously XOR-"encrypted" with a checksum. That key ships
// in the public JS bundle so it never protected anything -- storage is now
// plain JSON. This only exists to transparently upgrade saves written before
// the switch, so returning players don't lose their inventory.
function decodeLegacyEncryptedSave(raw: string): PlayerData | null {
  try {
    const decrypted = xorDecrypt(raw, LEGACY_CRYPTO_KEY);
    const { actionPoints, inventory, day, checksum } = JSON.parse(decrypted);
    const valid =
      checksum ===
      simpleHash(LEGACY_SECRET + JSON.stringify({ actionPoints, inventory, day }));
    return valid ? { actionPoints, inventory, day } : null;
  } catch {
    return null;
  }
}

function parseSave(raw: string): PlayerData | null {
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.actionPoints === "number" && Array.isArray(parsed.inventory)) {
      return parsed as PlayerData;
    }
  } catch {
    // fall through to legacy format
  }
  return decodeLegacyEncryptedSave(raw);
}

export async function loadPlayerData(): Promise<PlayerData | null> {
  migrateLegacyLocalStorageEntry();

  const raw = await getItem<string>(STORAGE_KEY);
  if (!raw) {
    const fresh = createFreshPlayerData();
    await savePlayerData(fresh);
    return fresh;
  }

  const data = parseSave(raw);
  if (!data) return null;

  await savePlayerData(data); // no-op for saves already in plain format
  return data;
}

export async function savePlayerData(data: PlayerData): Promise<void> {
  await setItem(STORAGE_KEY, JSON.stringify(data));
}

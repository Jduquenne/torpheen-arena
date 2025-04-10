import { useEffect, useState } from "react";
import { InventoryItem, LootItem } from "../interfaces";
import { simpleHash } from "../lib/hash";
import { xorDecrypt, xorEncrypt } from "../lib/crypto";

const STORAGE_KEY = "inventorySecure";
const SECRET = import.meta.env.VITE_INVENTORY_SECRET;
const CRYPTO_KEY = import.meta.env.VITE_INVENTORY_KEY;

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const save = (inv: InventoryItem[]) => {
    const data = JSON.stringify(inv);
    const checksum = simpleHash(SECRET + data);
    const encrypted = xorEncrypt(JSON.stringify({ inv, checksum }), CRYPTO_KEY);
    localStorage.setItem(STORAGE_KEY, encrypted);
  };

  const load = (): InventoryItem[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const decrypted = xorDecrypt(raw, CRYPTO_KEY);
      const { inv, checksum } = JSON.parse(decrypted);
      const valid = simpleHash(SECRET + JSON.stringify(inv)) === checksum;

      if (!valid) {
        alert("⚠️ Inventaire modifié. Réinitialisation.");
        return [];
      }

      return inv;
    } catch {
      return [];
    }
  };

  useEffect(() => {
    setInventory(load());
  }, []);

  const addItem = (item: LootItem) => {
    const existing = inventory.find((i) => i.id === item.id);
    let updated: InventoryItem[];

    if (existing) {
      updated = inventory.map((i) =>
        i.id === item.id ? { ...i, count: i.count + 1 } : i
      );
    } else {
      updated = [...inventory, { ...item, count: 1 }];
    }

    setInventory(updated);
    save(updated);
  };

  return { inventory, addItem };
}

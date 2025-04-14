import { useEffect, useState } from "react";
import { simpleHash } from "../lib/hash";
import { xorDecrypt, xorEncrypt } from "../lib/crypto";

const MAX_POINTS = 20;
const SECRET = import.meta.env.VITE_ACTION_SECRET;
const CRYPTO_KEY = import.meta.env.VITE_ACTION_KEY;
const STORAGE_KEY = "actionPointsSecure";

const getTodayKey = () => new Date().toISOString().split("T")[0];

export function useActionPoints() {
  const [points, setPoints] = useState(MAX_POINTS);
  const [locked, setLocked] = useState(false);

  const addPoint = () => {
    const newPoints = Math.min(points + 1, MAX_POINTS);
    const today = getTodayKey();
    setPoints(newPoints);
    save(newPoints, today);
  };

  const resetPoint = () => {
    const today = getTodayKey();
    setPoints(MAX_POINTS);
    save(MAX_POINTS, today);
  };

  const save = (points: number, day: string) => {
    const data = JSON.stringify({ points, day });
    const checksum = simpleHash(SECRET + data);
    const encrypted = xorEncrypt(
      JSON.stringify({ points, day, checksum }),
      CRYPTO_KEY
    );
    localStorage.setItem(STORAGE_KEY, encrypted);
  };

  const load = (): number => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = getTodayKey();

    if (!raw) {
      save(0, today);
      return 0;
    }

    try {
      const decrypted = xorDecrypt(raw, CRYPTO_KEY);
      const { points, day, checksum } = JSON.parse(decrypted);
      const isValid =
        checksum === simpleHash(SECRET + JSON.stringify({ points, day }));
      if (!isValid || day !== today) throw new Error("invalid");
      return points;
    } catch {
      save(0, today);
      return 0;
    }
  };

  useEffect(() => {
    const todayPoints = load();

    if (todayPoints === null) {
      // Pas de données valides → triche ou reset manuel ?
      // On lock l’accès
      setLocked(true);
    } else {
      setPoints(todayPoints);
    }
  }, []);

  const usePoint = () => {
    if (locked || points === null || points <= 0) return false;
    const newPoints = points - 1;
    const today = getTodayKey();
    setPoints(newPoints);
    save(newPoints, today);
    return true;
  };

  return {
    points,
    locked,
    usePoint,
    addPoint,
    resetPoint,
    isDrawDisabled: points <= 0,
    isMaxed: points >= MAX_POINTS,
  };
}

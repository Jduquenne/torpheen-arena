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

  const addPoint = () => {
    const newPoints = Math.min(points + 1, MAX_POINTS);
    const today = getTodayKey();
    setPoints(newPoints);
    save(newPoints, today);
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
      save(MAX_POINTS, today);
      return MAX_POINTS;
    }

    try {
      const decrypted = xorDecrypt(raw, CRYPTO_KEY);
      const { points, day, checksum } = JSON.parse(decrypted);
      const valid =
        checksum === simpleHash(SECRET + JSON.stringify({ points, day }));
      if (!valid || day !== today) throw new Error("invalid");
      return points;
    } catch {
      save(MAX_POINTS, today);
      return MAX_POINTS;
    }
  };

  useEffect(() => {
    setPoints(load());
  }, []);

  const usePoint = () => {
    if (points <= 0) return false;
    const newPoints = points - 1;
    const today = getTodayKey();
    setPoints(newPoints);
    save(newPoints, today);
    return true;
  };

  return {
    points,
    usePoint,
    addPoint,
    isDrawDisabled: points <= 0,
    isMaxed: points >= MAX_POINTS,
  };
}

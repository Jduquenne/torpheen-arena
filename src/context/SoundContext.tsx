import React, { createContext, useContext } from "react";
import { soundManager, SoundKey } from "../services/SoundManager";

interface SoundContextValue {
  play: (key: SoundKey) => void;
  stop: (key: SoundKey) => void;
  setVolume: (key: SoundKey, volume: number) => void;
  setMasterVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const value: SoundContextValue = {
    play: (key) => soundManager.play(key),
    stop: (key) => soundManager.stop(key),
    setVolume: (key, vol) => soundManager.setVolume(key, vol),
    setMasterVolume: (vol) => soundManager.setMasterVolume(vol),
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

export const useSound = (): SoundContextValue => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
};

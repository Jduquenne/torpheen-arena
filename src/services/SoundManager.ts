import { Howl, Howler } from "howler";
import { soundDefinitions } from "../data/soundTable";

export type SoundKey = "select" | "bonus" | string;

class SoundManager {
  private howls = new Map<SoundKey, Howl>();

  constructor() {
    Object.entries(soundDefinitions).forEach(([key, def]) => {
      const howl = new Howl({
        src: def.src,
        volume: def.volume ?? 1,
        loop: def.loop ?? false,
        html5: def.html5 === true, // only enable HTML5 for sounds marked html5 (e.g., looped bgm)
        pool: 10,
      });
      this.howls.set(key, howl);
    });
  }

  play(key: SoundKey) {
    const howl = this.howls.get(key);
    if (!howl) {
      console.warn(`SoundManager: key '${key}' not defined`);
      return;
    }
    howl.play();
  }

  stop(key: SoundKey) {
    this.howls.get(key)?.stop();
  }

  setVolume(key: SoundKey, volume: number) {
    this.howls.get(key)?.volume(volume);
  }

  setMasterVolume(volume: number) {
    Howler.volume(volume);
  }
}

export const soundManager = new SoundManager();

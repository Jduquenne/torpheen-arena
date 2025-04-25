export type SoundKey = "click" | "bonus" | "bgm" | string;

interface SoundDefinition {
  src: string | string[]; // Array for fallback formats
  volume?: number; // Default volume (0.0–1.0)
  loop?: boolean; // Loop playback
  html5?: boolean;
}

export const soundDefinitions: Record<SoundKey, SoundDefinition> = {
  select: {
    src: ["./assets/audio/select.ogg"],
    volume: 0.05,
  },
  bonus: {
    src: ["./assets/audio/bonus.ogg"],
    volume: 0.1,
  },
};

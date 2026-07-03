import { describe, expect, it } from "vitest";
import { xorEncrypt, xorDecrypt, base64Encode, base64Decode } from "./crypto";

describe("base64Encode/base64Decode", () => {
  it("round-trips UTF-8 strings", () => {
    const input = "héllo wörld 🎲";
    expect(base64Decode(base64Encode(input))).toBe(input);
  });
});

describe("xorEncrypt/xorDecrypt", () => {
  it("round-trips a payload with a given key", () => {
    const payload = JSON.stringify({ actionPoints: 12, inventory: [1, 2, 3] });
    const key = "some-secret-key";
    expect(xorDecrypt(xorEncrypt(payload, key), key)).toBe(payload);
  });

  it("does not decrypt correctly with the wrong key", () => {
    const payload = "sensitive-data";
    const encrypted = xorEncrypt(payload, "key-a");
    expect(xorDecrypt(encrypted, "key-b")).not.toBe(payload);
  });
});

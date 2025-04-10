// Encodage en Base64 (UTF-8 safe)
export function base64Encode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

// Décodage depuis Base64 (UTF-8 safe)
export function base64Decode(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

export function xorEncrypt(str: string, key: string): string {
  const result = str
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    )
    .join("");
  return base64Encode(result);
}

export function xorDecrypt(data: string, key: string): string {
  const decoded = base64Decode(data);
  return decoded
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    )
    .join("");
}

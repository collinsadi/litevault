const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();
const SALT_KEY = "litevault-salt";

const getSalt = async (): Promise<Uint8Array> => {
  let salt = localStorage.getItem(SALT_KEY);
  if (!salt) {
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    localStorage.setItem(SALT_KEY, btoa(String.fromCharCode(...saltBytes)));
    return saltBytes;
  }
  return new Uint8Array(
    atob(salt)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
};

const deriveKey = async (
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> => {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    TEXT_ENCODER.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encryptData = async (
  data: any,
  password: string
): Promise<string> => {
  const salt = await getSalt();
  const key = await deriveKey(password, salt);

  const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM requires 12-byte IV
  const encoded = TEXT_ENCODER.encode(JSON.stringify(data));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  return JSON.stringify({
    iv: Array.from(iv),
    ciphertext: Array.from(new Uint8Array(ciphertext)),
  });
};

export const decryptData = async (
  payload: string,
  password: string
): Promise<any> => {
  const { iv, ciphertext } = JSON.parse(payload);
  const salt = await getSalt();
  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    key,
    new Uint8Array(ciphertext)
  );

  return JSON.parse(TEXT_DECODER.decode(decrypted));
};

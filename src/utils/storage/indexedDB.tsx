import { encrypt, decrypt } from "../encryption/encryption";

const DB_NAME = "litevault";
const STORE_NAME = "vault";
const KEY_ID = "data";

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveSeedPhrase = async (
  seedPhrase: string,
  password: string
): Promise<void> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  const encrypted = encrypt(seedPhrase, password);
  store.put({ id: KEY_ID, value: encrypted });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

export const getSeedPhrase = async (
  password: string
): Promise<string | null> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(KEY_ID);

    request.onsuccess = () => {
      if (!request.result) return resolve(null);

      try {
        const decrypted = decrypt(request.result.value, password);
        resolve(decrypted);
      } catch (err) {
        reject(new Error("Invalid password or corrupted data"));
      }
    };

    request.onerror = () => reject(request.error);
  });
};

export const deleteSeedPhrase = async (): Promise<void> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.delete(KEY_ID);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};

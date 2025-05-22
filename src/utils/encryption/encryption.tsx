import CryptoJS from "crypto-js";

export const encrypt = (password: string, seedPhrase: string) => {
  const encrypted = CryptoJS.AES.encrypt(seedPhrase, password).toString();
  return encrypted;
};

export const decrypt = (password: string, encrypted: string) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, password).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
};

export const hashPassword = (password: string) => {
  return CryptoJS.SHA256(password).toString();
};

export const verifyPassword = (password: string, hash: string) => {
  return hash === hashPassword(password);
};

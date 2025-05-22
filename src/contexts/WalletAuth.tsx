import React, { createContext, useContext, useState } from "react";

export const WalletAuthContext = createContext<any>(null);

export function useWalletAuth() {
  return useContext(WalletAuthContext);
}

export function WalletAuthProvider({ children }: React.PropsWithChildren) {
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [privateKey, setPrivateKey] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [showNewWalletModal, setShowNewWalletModal] = useState<boolean>(false);
  const [showImportWalletModal, setShowImportWalletModal] =
    useState<boolean>(false);
  const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  return (
    <WalletAuthContext.Provider
      value={{
        seedPhrase,
        setSeedPhrase,
        privateKey,
        setPrivateKey,
        address,
        setAddress,
        showNewWalletModal,
        setShowNewWalletModal,
        showImportWalletModal,
        setShowImportWalletModal,
        showSeedPhrase,
        setShowSeedPhrase,
        error,
        setError,
        success,
        setSuccess,
      }}
    >
      {children}
    </WalletAuthContext.Provider>
  );
}

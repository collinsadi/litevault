import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

interface IUser {
  address: string;
  seedPhrase: string;
  password: string | null;
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordSet, setIsPasswordSet] = useState<boolean>(false);
  const [isSeedPhraseSet, setIsSeedPhraseSet] = useState<boolean>(false);
  const [isAddressSet, setIsAddressSet] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        seedPhrase,
        setSeedPhrase,
        password,
        setPassword,
        isPasswordSet,
        setIsPasswordSet,
        isSeedPhraseSet,
        setIsSeedPhraseSet,
        isAddressSet,
        setIsAddressSet,
        showPasswordModal,
        setShowPasswordModal,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

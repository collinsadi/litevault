import React, { createContext, useContext, useState } from "react";

export const NetworkContext = createContext<any>(null);

export function useNetwork() {
  return useContext(NetworkContext);
}

export function NetworkProvider({ children }: React.PropsWithChildren) {
  const [networkModal, setNetworkModal] = useState<boolean>(false);
  const [currentNetwork, setCurrentNetwork] = useState<string>("");
  const [networks, setNetworks] = useState<any[]>([]);

  return (
    <NetworkContext.Provider
      value={{
        networkModal,
        setNetworkModal,
        currentNetwork,
        setCurrentNetwork,
        networks,
        setNetworks,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

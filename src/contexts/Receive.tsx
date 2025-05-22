import React, { createContext, useContext, useState } from "react";

export const ReceiveContext = createContext<any>(null);

export function useReceive() {
  return useContext(ReceiveContext);
}

export function ReceiveProvider({ children }: React.PropsWithChildren) {
  const [receiveModal, setReceiveModal] = useState<boolean>(false);
  const [sendModal, setSendModal] = useState<boolean>(false);

  return (
    <ReceiveContext.Provider
      value={{
        receiveModal,
        setReceiveModal,
        sendModal,
        setSendModal,
      }}
    >
      {children}
    </ReceiveContext.Provider>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { NetworkProvider } from "./contexts/Network.tsx";
import { TokenProvider } from "./contexts/Token.tsx";
import { ReceiveProvider } from "./contexts/Receive.tsx";
import { WalletAuthProvider } from "./contexts/WalletAuth.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { config } from "./config/wagmi";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <NetworkProvider>
            <TokenProvider>
              <ReceiveProvider>
                <WalletAuthProvider>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </WalletAuthProvider>
              </ReceiveProvider>
            </TokenProvider>
          </NetworkProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);

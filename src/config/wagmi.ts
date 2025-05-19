import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Lite Vault",
  projectId: "341673c77baaa234f61c1d08419c2b94",
  chains: [sepolia],
  ssr: true,
});

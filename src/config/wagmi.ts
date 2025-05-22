import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Lite Vault",
  projectId: "11111111111111111111111111111111",
  chains: [sepolia],
  ssr: true,

});


// 341673c77baaa234f61c1d08419c2b94
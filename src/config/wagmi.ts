import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, liskSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Lite Vault",
  projectId: "YOUR_PROJECT_ID",
  chains: [liskSepolia, sepolia],
  ssr: true,
});

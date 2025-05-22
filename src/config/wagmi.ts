import { http, createConfig } from "wagmi";
import { sepolia, liskSepolia } from "wagmi/chains";
import { injected, metaMask, safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia, liskSepolia],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [sepolia.id]: http(),
    [liskSepolia.id]: http(),
  },
});

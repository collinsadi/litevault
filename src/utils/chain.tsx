import { networks } from "../constants/networks";

export const getChainName = (chainId: number) => {
  const chain = networks.find((network) => network.id === chainId);
  return chain?.name;
};

export const getChainId = (chainName: string) => {
  const chain = networks.find((network) => network.name === chainName);
  return chain?.id;
};

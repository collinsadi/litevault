export const getRpcUrl = (chainId: number) => {
  const rpcUrl = import.meta.env[`VITE_RPC_URL_${chainId}`];
  return rpcUrl;
};

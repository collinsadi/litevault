import { formatUnits } from "viem";

export const formatBalance = (balance: bigint, decimals: number) => {
  return formatUnits(balance, decimals);
};

import { formatUnits } from "viem";

export const formatBalance = (balance: bigint, decimals: number) => {
  return formatUnits(balance, decimals);
};

export const formatBalanceWithCommas = (balance: string) => {
  return balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

import { erc20Abi } from "viem";
import { useReadContract, useBalance } from "wagmi";

type GetBalanceProps = {
  address: `0x${string}`;
  tokenAddress: `0x${string}`;
};

export const useGetBalance = ({ address, tokenAddress }: GetBalanceProps) => {
  const { data } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
    chainId: 11155111,
  });

  return data;
};

export const useGetEthBalance = ({ address }: { address: `0x${string}` }) => {
  const { data } = useBalance({
    address: address,
  });

  return data;
};

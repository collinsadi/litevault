import { FaEthereum } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { NewTokenButton } from "./NewTokenButton";
import { useGetBalance, useGetEthBalance } from "../../hooks/useGetBalance";
import { useEffect, useState } from "react";
import { formatBalance } from "../../utils/formatBalance";
import { useAuth } from "../../contexts/AuthContext";
import { formatBalanceWithCommas } from "../../utils/formatBalance";
import { useToken } from "../../contexts/Token";

interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
}
export const TokenList = () => {
  const { tokens } = useToken();
  const [balances, setBalances] = useState<{ [key: string]: string | null }>(
    {}
  );
  const { currentUser } = useAuth();
  const address = currentUser?.address;

  // Get ETH balance
  const ethBalance = useGetEthBalance({
    address: address as `0x${string}`,
  });

  // Get balances for all tokens except ETH
  const tokenBalances = tokens.slice(1).map((token: Token) => {
    return useGetBalance({
      address: address as `0x${string}`,
      tokenAddress: token.address as `0x${string}`,
    });
  });

  useEffect(() => {
    const newBalances: { [key: string]: string | null } = {};

    // Format ETH balance
    if (ethBalance) {
      newBalances["ETH"] = formatBalance(ethBalance.value, 18);
    }

    // Format token balances
    tokenBalances.forEach((balance: any, index: number) => {
      if (balance) {
        const token = tokens[index + 1]; // +1 because we skipped ETH
        newBalances[token.symbol] = formatBalance(balance, token.decimals);
      }
    });

    if (JSON.stringify(newBalances) !== JSON.stringify(balances)) {
      setBalances(newBalances);
    }
  }, [ethBalance, tokenBalances]);

  return (
    <div className="mb-5 mt-10 w-full">
      {/* ETH Token */}
      <div className="cursor-pointer w-full flex items-center justify-between gap-2 my-2">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] bg-gray-500 rounded-md flex items-center justify-center">
            <FaEthereum size={20} color="black" />
          </div>
          <div>
            <h3 className="text-md font-mono text-white">ETHEREUM</h3>
          </div>
        </div>
        <div>
          <h3 className="text-md font-mono text-gray-400">
            {balances["ETH"]} ETH
          </h3>
        </div>
      </div>

      {/* Other Tokens */}
      {tokens.slice(1).map((token: Token) => (
        <div
          key={token.address}
          className="cursor-pointer w-full flex items-center justify-between gap-2 my-2"
        >
          <div className="flex items-center gap-4">
            <div className="w-[40px] h-[40px] bg-[#F47E60] rounded-md flex items-center justify-center">
              <IoIosFlash size={20} color="black" />
            </div>
            <div>
              <h3 className="text-md font-mono text-white">{token.name}</h3>
            </div>
          </div>
          <div>
            <h3 className="text-md font-mono text-gray-400">
              {formatBalanceWithCommas(balances[token.symbol] || "0")}{" "}
              {token.symbol}
            </h3>
          </div>
        </div>
      ))}

      <NewTokenButton />
    </div>
  );
};

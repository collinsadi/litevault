import { FaEthereum } from "react-icons/fa";
import { NewTokenButton } from "./NewTokenButton";
import { useGetEthBalance } from "../../hooks/useGetBalance";
import { useEffect, useState } from "react";
import { formatBalance } from "../../utils/formatBalance";
import { useAuth } from "../../contexts/AuthContext";
import { useToken } from "../../contexts/Token";
import { TokenRow } from "./TokenRow";
import { useChainId } from "wagmi";

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
  const chainId = useChainId();

  const filteredTokens = tokens.slice(1).filter(
    (token: Token) => token.chainId === chainId
  );

  // Get ETH balance
  const ethBalance = useGetEthBalance({
    address: address as `0x${string}`,
  });

  useEffect(() => {
    const newBalances: { [key: string]: string | null } = {};

    // Format ETH balance
    if (ethBalance) {
      newBalances["ETH"] = formatBalance(ethBalance.value, 18);
    }

    if (JSON.stringify(newBalances) !== JSON.stringify(balances)) {
      setBalances(newBalances);
    }
  }, [ethBalance]);

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
      {filteredTokens.map((token: Token) => (
        <TokenRow
          key={token.address}
          token={token}
          userAddress={address as `0x${string}`}
        />
      ))}

      <NewTokenButton />
    </div>
  );
};

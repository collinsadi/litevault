import { IoIosFlash } from "react-icons/io";
import { useGetBalance } from "../../hooks/useGetBalance";
import { formatBalanceWithCommas } from "../../utils/formatBalance";
import { formatBalance } from "../../utils/formatBalance";
import { useToken } from "../../contexts/Token";
interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
}

interface TokenRowProps {
  token: Token;
  userAddress: `0x${string}`;
}

export const TokenRow = ({ token, userAddress }: TokenRowProps) => {
  const { setSelectedToken } = useToken();
  const balance = useGetBalance({
    address: userAddress,
    tokenAddress: token.address as `0x${string}`,
  });

  const formattedBalance = formatBalance(balance ?? BigInt(0), token.decimals);

  const handleSelectToken = () => {
    setSelectedToken(token);
  };

  return (
    <div
      onClick={handleSelectToken}
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
          {formatBalanceWithCommas(formattedBalance)} {token.symbol}
        </h3>
      </div>
    </div>
  );
};

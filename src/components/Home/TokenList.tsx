import { FaEthereum } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
// import { NewTokenButton } from "./NewTokenButton";
import { useAccount } from "wagmi";
import { tokens } from "../../data/Tokens";
import { useGetBalance, useGetEthBalance } from "../../hooks/useGetBalance";
import { useEffect, useState } from "react";
import { formatBalance } from "../../utils/formatBalance";

export const TokenList = () => {
  const [balanceHolder, setBalanceHolder] = useState<string | null>(null);
  const [ethBalanceHolder, setEthBalanceHolder] = useState<string | null>(null);
  const { address } = useAccount();
  const balance = useGetBalance({
    address: address as `0x${string}`,
    tokenAddress: tokens[1].address as `0x${string}`,
  });

  const ethBalance = useGetEthBalance({
    address: address as `0x${string}`,
  });

  useEffect(() => {
    if (balance) {
      setBalanceHolder(formatBalance(balance, 2));
    }
    if (ethBalance) {
      const formattedEthBalance = formatBalance(ethBalance.value, 18);
      setEthBalanceHolder(formattedEthBalance);
    }
  }, [balance, ethBalance]);

  return (
    <div className="mb-5 mt-10 w-full">
      <div className=" cursor-pointer w-full flex items-center justify-between gap-2 my-2">
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
            {ethBalanceHolder} ETH
          </h3>
        </div>
      </div>

      <div className=" cursor-pointer w-full flex items-center justify-between gap-2 my-2">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] bg-[#F47E60] rounded-md flex items-center justify-center">
            <IoIosFlash size={20} color="black" />
          </div>

          <div>
            <h3 className="text-md font-mono text-white">MIND TOKEN</h3>
          </div>
        </div>

        <div>
          <h3 className="text-md font-mono text-gray-400">
            {balanceHolder} MND
          </h3>
        </div>
      </div>

      {/* <NewTokenButton /> */}
    </div>
  );
};

import { formatBalance } from "../../utils/formatBalance";
import { useGetEthBalance } from "../../hooks/useGetBalance";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
export const WalletBalance = () => {
  const [ethBalanceHolder, setEthBalanceHolder] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const ethBalance = useGetEthBalance({
    address: currentUser?.address as `0x${string}`,
  });

  useEffect(() => {
    if (ethBalance) {
      const formattedEthBalance = formatBalance(ethBalance.value, 18);
      setEthBalanceHolder(formattedEthBalance);
    }
  }, [ethBalance]);
  return (
    <div className="w-full p-4 rounded-xl mt-30">
      <h3 className="text-md font-mono text-gray-400">WALLET BALANCE</h3>
      <h3 className="text-2xl font-mono text-white my-2">
        {ethBalanceHolder} ETH
      </h3>
    </div>
  );
};

import { useNetwork } from "../../contexts/Network";
import { useAuth } from "../../contexts/AuthContext";
import { maskAddress } from "../../utils/maskAddress";
import { useChainId } from "wagmi";
import { getChainName } from "../../utils/chain";
import { useEffect, useState } from "react";

export const Header = () => {
  const { setNetworkModal } = useNetwork();
  const { currentUser } = useAuth();
  const chainId = useChainId();
  const [chainName, setChainName] = useState<string>("");
  const address = currentUser?.address;
  const openModal = () => {
    setNetworkModal(true);
  };

  useEffect(() => {
    const chainName = getChainName(chainId);
    if (chainName) {
      setChainName(chainName);
    }
  }, [chainId]);

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/avatar.png" alt="avatar" className="w-10 h-10 rounded-md" />
        <h3 className="text-white text-xl font-mono">
          {maskAddress(address as string)}
        </h3>
      </div>

      <div onClick={openModal} className="cursor-pointer">
        <h3 className="text-lg font-mono text-gray-400">{chainName}</h3>
      </div>
    </div>
  );
};

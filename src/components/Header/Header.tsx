// import { useNetwork } from "../../contexts/Network";
import { maskAddress } from "../../utils/maskAddress";
import { useAccount } from "wagmi";

export const Header = () => {
  // const { setNetworkModal } = useNetwork();

  // const openModal = () => {
  //   setNetworkModal(true);
  // };

  const { address } = useAccount();

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/avatar.png" alt="avatar" className="w-10 h-10 rounded-md" />
        <h3 className="text-white text-xl font-mono">
          {maskAddress(address as string)}
        </h3>
      </div>

      <div className="cursor-pointer">
        <h3 className="text-lg font-mono text-gray-400">Ethereum Sepolia</h3>
      </div>
    </div>
  );
};

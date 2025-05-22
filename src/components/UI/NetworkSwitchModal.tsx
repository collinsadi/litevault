import { useNetwork } from "../../contexts/Network";
import { Modal } from "./Modal";
import { MdLogout } from "react-icons/md";
import { useChainId, useSwitchChain } from "wagmi";

export const NetworkSwitchModal = () => {
  const { setNetworkModal } = useNetwork();
  const handleClose = () => {
    setNetworkModal(false);
  };
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  const handleSwitchNetwork = (chainId: number) => {
    switchChain({ chainId });

    setNetworkModal(false);
  };

  return (
    <Modal onClose={handleClose}>
      <div className="w-full flex flex-col items-center justify-center gap-4 mt-20">
        {chains.map((network) => (
          <h3
            key={network.id}
            className={`text-xl font-mono cursor-pointer ${
              chainId === network.id ? "text-gray-400" : "text-white "
            }`}
            onClick={() => handleSwitchNetwork(network.id)}
          >
            {network.name}
          </h3>
        ))}
        <div className="w-full flex items-center justify-center gap-2 mt-20">
          <button className="w-fit bg-amber-500 font-mono text-black px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer">
            <MdLogout size={24} />
            Disconnect
          </button>
        </div>
      </div>
    </Modal>
  );
};

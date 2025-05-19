import { useNetwork } from "../../contexts/Network";
import { Modal } from "./Modal";
import { MdLogout } from "react-icons/md";

export const NetworkSwitchModal = () => {
  const { setNetworkModal } = useNetwork();
  const handleClose = () => {
    setNetworkModal(false);
  };
  return (
    <Modal onClose={handleClose}>
      <div className="w-full flex flex-col items-center justify-center gap-4 mt-20">
        <h3 className="text-gray-400 text-xl font-mono cursor-pointer">
          Ethereum Sepolia
        </h3>
        <h3 className="text-white text-xl font-mono cursor-pointer">
          Lisk Sepolia
        </h3>

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

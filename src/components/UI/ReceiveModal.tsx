import { Modal } from "./Modal";
import { useAccount } from "wagmi";
import { useReceive } from "../../contexts/Receive";

export const ReceiveModal = () => {
  const { setReceiveModal } = useReceive();
  const handleClose = () => {
    setReceiveModal(false);
  };
  const { address} = useAccount();

  

  const handleCopy = () => {
    navigator.clipboard.writeText(String(address)).then(() => {
      alert("Address copied to clipboard");
    }).catch(() => {
      alert("Failed to copy address");
    });
  };
  return (
    <Modal
      onClose={handleClose}
      overrideHeight="h-full"
      overrideColor="bg-black"
      overrideCloseButton={true}
    >
      <div className="w-full h-full flex flex-col items-center  gap-4 font-mono">
        <div className="w-full flex flex-col items-center justify-center">
          <button
            onClick={handleClose}
            className="text-xl text-gray-400 hover:text-white cursor-pointer"
          >
            CANCEL
          </button>
        </div>

        <div className="w-full flex flex-col items-center justify-center my-10">
          <h3 className="text-3xl">RECEIVE</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-full"
            disabled
            value={address}
          />
          
        </div>

 

        <div className="w-full flex items-center justify-center">
          <button onClick={handleCopy} className="text-xl text-gray-400 cursor-pointer hover:text-white">
            COPY ADDRESS
          </button>
        </div>
      </div>
    </Modal>
  );
};

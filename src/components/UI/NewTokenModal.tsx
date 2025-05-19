import { Modal } from "./Modal";
import { useToken } from "../../contexts/Token";

export const NewTokenModal = () => {
  const { setNewTokenModal } = useToken();
  const handleClose = () => {
    setNewTokenModal(false);
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
          <h3 className="text-3xl">NEW TOKEN</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
          />
          <h3>TOKEN ADDRESS</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
          />
          <h3>TOKEN NAME</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
          />
          <h3>TOKEN SYMBOL</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
          />
          <h3>TOKEN DECIMALS</h3>
        </div>

        <div className="w-full flex items-center justify-center">
          <button className="text-xl text-gray-400 cursor-pointer hover:text-white">
            ADD TOKEN
          </button>
        </div>
      </div>
    </Modal>
  );
};

import { Modal } from "./Modal";
import { TransactionCard } from "./TransactionCard";
import { useToken } from "../../contexts/Token";

export const TokenDetailsModal = () => {
  const { setSelectedToken } = useToken();

  const handleClose = () => {
    setSelectedToken(null);
  };
  return (
    <Modal
      onClose={handleClose}
      overrideHeight="h-full"
      overrideColor="bg-black"
      overrideCloseButton={true}
    >
      <div className="w-full h-full flex flex-col items-center  gap-4 font-mono pb-10">
        <div className="w-full flex flex-col items-center justify-center">
          <button
            onClick={handleClose}
            className="text-xl text-gray-400 hover:text-white cursor-pointer"
          >
            BACK
          </button>
        </div>

        <div className="w-full flex flex-col items-center justify-center my-10">
          <h3 className="text-3xl">MND</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={"640,400"}
            disabled
          />
          <h3>YOUR BALANCE</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={"0x0A..B6AC3"}
            disabled
          />
          <h3>TOKEN ADDRESS</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={"Mind Token"}
            disabled
          />
          <h3>TOKEN NAME</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={"MND"}
            disabled
          />
          <h3>TOKEN SYMBOL</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={"18"}
            disabled
          />
          <h3>TOKEN DECIMALS</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={"Ethereum"}
            disabled
          />
          <h3>NETWORK</h3>
        </div>

        <div className="w-full flex items-center justify-center flex-col">
          <TransactionCard />
          <TransactionCard />
        </div>
      </div>
    </Modal>
  );
};

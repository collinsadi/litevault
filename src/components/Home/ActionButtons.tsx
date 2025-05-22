import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useReceive } from "../../contexts/Receive";
export const ActionButtons = () => {
  const { setReceiveModal, setSendModal } = useReceive();
  return (
    <div className="w-full flex justify-between items-center mt-5">
      <div onClick={() => setReceiveModal(true)} className="w-[48%] bg-yellow-500 text-black p-4 rounded-xl flex items-center justify-center cursor-pointer">
        <div className="flex items-center gap-2">
          <FaArrowDown size={30} />
          <h3 className="text-lg font-mono text-black font-bold">Receive</h3>
        </div>
      </div>

      <div onClick={() => setSendModal(true)} className="w-[48%] bg-gray-500 text-black p-4 rounded-xl flex items-center justify-center cursor-pointer">
        <div className="flex items-center gap-2">
          <FaArrowUp size={30} />
          <h3 className="text-lg font-mono text-black font-bold">Send</h3>
        </div>
      </div>
    </div>
  );
};

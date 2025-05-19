import { FiPlus } from "react-icons/fi";
import { useToken } from "../../contexts/Token";

export const NewTokenButton = () => {
  const { setNewTokenModal } = useToken();
  return (
    <div
      onClick={() => setNewTokenModal(true)}
      className="w-full flex items-center justify-between my-10 gap-2 font-mono text-white cursor-pointer"
    >
      <h3>IMPORT NEW TOKEN</h3>

      <FiPlus size={20} color="white" />
    </div>
  );
};

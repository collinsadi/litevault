import { FiPlus } from "react-icons/fi";

export const NewTokenButton = () => {
  return (
    <div className="w-full flex items-center justify-between my-10 gap-2 font-mono text-white cursor-pointer">
      <h3>IMPORT NEW TOKEN</h3>

      <FiPlus size={20} color="white" />
    </div>
  );
};

import { IoClose } from "react-icons/io5";
export const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="w-full h-full  bg-black/50 absolute inset-0 z-50 flex items-end justify-center backdrop-blur-sm p-2">
      <div className="w-full min-h-[400px] bg-[#333333]  p-4">
        <div className="flex justify-end">
          <button className="text-white text-2xl font-mono cursor-pointer" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

import { IoClose } from "react-icons/io5";
export const Modal = ({
  children,
  onClose,
  overrideHeight,
  overrideColor,
  overrideCloseButton,
}: {
  children: React.ReactNode;
  onClose: () => void;
  overrideHeight?: string;
  overrideColor?: string;
  overrideCloseButton?: boolean;
}) => {
  return (
    <div className="w-full h-full  bg-black/50 absolute inset-0 z-50 flex items-end justify-center backdrop-blur-sm p-2">
      <div
        className={`w-full ${
          overrideHeight ? overrideHeight : "min-h-[400px]"
        } ${overrideColor ? overrideColor : "bg-[#333333]"}  p-4`}
      >
        <div className="flex justify-end">
          {overrideCloseButton ? (
            overrideCloseButton
          ) : (
            <button
              className="text-white text-2xl font-mono cursor-pointer"
              onClick={onClose}
            >
              <IoClose size={24} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

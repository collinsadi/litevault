import { Modal } from "./Modal";
import { useReceive } from "../../contexts/Receive";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../../contexts/AuthContext";
import { maskAddress } from "../../utils/maskAddress";
import { useState } from "react";

export const ReceiveModal = () => {
  const { setReceiveModal } = useReceive();
  const [copied, setCopied] = useState(false);
  const handleClose = () => {
    setReceiveModal(false);
  };
  const { currentUser } = useAuth();
  const address = currentUser?.address;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(String(address))
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {
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

        <div className="w-full flex items-center justify-center">
          <QRCodeCanvas
            imageSettings={{
              src: "/eth.webp",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              opacity: 1,
              excavate: true,
            }}
            value={address}
          />
        </div>

        <div className="w-full flex items-center justify-between  pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-full text-center text-2xl"
            disabled
            value={maskAddress(address)}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleCopy}
            className={`text-xl text-gray-400 cursor-pointer ${
              copied ? "text-green-500" : "hover:text-white"
            }`}
          >
            {copied ? "COPIED" : "COPY ADDRESS"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

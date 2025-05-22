import { Modal } from "./Modal";
import { useReceive } from "../../contexts/Receive";
import { useWriteContract } from 'wagmi'
import { erc20Abi } from "viem";
import { useState } from "react";

export const SendModal = () => {
  const { setSendModal } = useReceive();
  const handleClose = () => {
    setSendModal(false);
  };

  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { writeContract } = useWriteContract()


  const handleSend = () => {
    writeContract({ 
        abi: erc20Abi,
        address: '0x97c348048115c7967F2BCB93CA0F947122D219b1',
        functionName: 'transfer',
        args: [
            recipient as `0x${string}`,
            BigInt(amount),
        ],
     })
    }
  
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
          <h3 className="text-3xl">SEND</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <h3>RECIPIENT</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <h3>AMOUNT</h3>
        </div>

        <div className="w-full flex items-center justify-center">
          <button onClick={handleSend} className="text-xl text-gray-400 cursor-pointer hover:text-white">
            SEND
          </button>
        </div>
      </div>
    </Modal>
  );
}

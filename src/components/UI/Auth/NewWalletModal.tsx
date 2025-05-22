import { Modal } from "../Modal";
import { useWalletAuth } from "../../../contexts/WalletAuth";
import { SeedWordContainer } from "./SeedWordContainer";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
export const NewWalletModal = () => {
  const [copied, setCopied] = useState(false);
  const {
    setShowNewWalletModal,
    seedPhrase,
    setShowSeedPhrase,
    showSeedPhrase,
  } = useWalletAuth();

  const handleClose = () => {
    setShowNewWalletModal(false);
  };

  const toggleSeedPhraseView = () => {
    setShowSeedPhrase(!showSeedPhrase);
  };

  const seedWords = [
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
    "Whisper",
  ];

  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(seedWords.join(" "));

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Modal
      onClose={handleClose}
      overrideColor="bg-black"
      overrideHeight="h-full"
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

        <div className="w-full flex flex-col justify-center my-10">
          <h3 className="text-3xl ">
            Your 12-Word <br /> Recovery Phrase
          </h3>
          <p className="text-gray-400 text-sm my-2">
            Keep it safe and secure. You will need it to recover your wallet.
          </p>
        </div>

        <div className="w-full flex  items-center justify-center gap-2 flex-wrap">
          {seedWords.map((word, index) => (
            <SeedWordContainer key={index} word={word} index={index + 1} />
          ))}
        </div>

        <div className="w-full flex items-center justify-end gap-2 my-5 px-5">
          <div
            onClick={handleCopySeedPhrase}
            className="w-fit bg-white rounded-md p-3 text-black flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied && <p className="text-sm text-green-600">Copied</p>}
            {!copied ? <IoCopyOutline /> : <IoCheckmarkOutline color="green" />}
          </div>

          <div
            onClick={toggleSeedPhraseView}
            className="w-fit bg-white rounded-md p-2 text-black flex items-center justify-center gap-2 cursor-pointer"
          >
            <p>{!showSeedPhrase ? "Hide" : "Reveal"}</p>
            {!showSeedPhrase ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>
    </Modal>
  );
};

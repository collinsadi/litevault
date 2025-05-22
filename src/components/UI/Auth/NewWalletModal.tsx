import { Modal } from "../Modal";
import { useWalletAuth } from "../../../contexts/WalletAuth";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { LockedInButton } from "./LockedInButton";
import { SeedPhrasesContainer } from "./SeedPhrasesContainer";
export const NewWalletModal = () => {
  const [copied, setCopied] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
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

  const handleAcknowledgement = () => {
    setAcknowledged(!acknowledged);
  };

  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(seedPhrase.join(" "));

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

        <div className="w-full flex flex-col justify-center my-5">
          <h3 className="text-3xl ">
            Your 12-Word <br /> Recovery Phrase
          </h3>
          <p className="text-gray-400 text-sm my-2">
            Keep it safe and secure. You will need it to recover your wallet.
          </p>
        </div>

        <SeedPhrasesContainer />

        {seedPhrase.length > 0 && (
          <>
            <div className="w-full flex items-center justify-end gap-2 my-5 px-5">
              <div
                onClick={handleCopySeedPhrase}
                className="w-fit bg-white rounded-md p-3 text-black flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied && <p className="text-sm text-green-600">Copied</p>}
                {!copied ? (
                  <IoCopyOutline />
                ) : (
                  <IoCheckmarkOutline color="green" />
                )}
              </div>

              <div
                onClick={toggleSeedPhraseView}
                className="w-fit bg-white rounded-md p-2 text-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <p>{!showSeedPhrase ? "Hide" : "Reveal"}</p>
                {!showSeedPhrase ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Full Control Acknowledgement */}
            <div
              onClick={handleAcknowledgement}
              className="w-full flex items-start justify-center gap-3 cursor-pointer"
            >
              <span>
                {acknowledged ? (
                  <FaRegCheckCircle className="text-green-600" />
                ) : (
                  <FaRegCircle className="text-gray-400" />
                )}
              </span>
              <p className="text-sm text-gray-400">
                I Acknowledge that I have full control over my wallet, and It
                can not be recovered by anyone else, not even LiteVault.
              </p>
            </div>

            <LockedInButton acknowledged={acknowledged} />
          </>
        )}
      </div>
    </Modal>
  );
};

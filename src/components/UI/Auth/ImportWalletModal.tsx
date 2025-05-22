import { Modal } from "../Modal";
import { useWalletAuth } from "../../../contexts/WalletAuth";
import { useState } from "react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { NewSeedPhraseInputContainer } from "./NewSeedPhraseInputContainer";
import { LoginLockedInButton } from "./LoginLockedInButton";
export const ImportWalletModal = () => {
  const [acknowledged, setAcknowledged] = useState(false);
  const { setShowImportWalletModal, setError } = useWalletAuth();

  const handleClose = () => {
    setError(null);
    setShowImportWalletModal(false);
  };

  const handleAcknowledgement = () => {
    setAcknowledged(!acknowledged);
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
            Enter your 12-word recovery phrase to import your wallet.
          </p>
        </div>

        <NewSeedPhraseInputContainer />

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
            I Acknowledge that I have full control over my wallet, and It can
            not be recovered by anyone else, not even LiteVault.
          </p>
        </div>

        <LoginLockedInButton acknowledged={acknowledged} />
      </div>
    </Modal>
  );
};

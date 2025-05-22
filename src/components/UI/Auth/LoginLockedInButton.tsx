import { FaLocationArrow } from "react-icons/fa6";
import { useWalletAuth } from "../../../contexts/WalletAuth";
import { ethers } from "ethers";

export const LoginLockedInButton = ({
  acknowledged,
}: {
  acknowledged: boolean;
}) => {
  const {
    setShowNewPasswordModal,
    setShowNewWalletModal,
    words,
    setSeedPhrase,
    setAddress,
    setError,
    setShowImportWalletModal,
  } = useWalletAuth();

  const handleLockedIn = () => {
    const joinedWords = words.join(" ");

    try {
      setError(null);
      const isValid = ethers.Wallet.fromPhrase(joinedWords);

      if (!isValid) {
        setError("Invalid seed phrase");
        return;
      }

      setSeedPhrase(words);
      setAddress(isValid.address);
      setShowNewPasswordModal(true);
      setShowNewWalletModal(false);
      setError(null);
      setShowImportWalletModal(false);
    } catch (error) {
      setError("Invalid seed phrase");
    }
  };
  return (
    <div className="w-full flex items-center justify-center mt-auto  text-xl text-gray-400">
      <button
        className={`flex items-center gap-2  ${
          !acknowledged
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:text-white "
        }`}
        disabled={!acknowledged}
        onClick={handleLockedIn}
      >
        Locked In{" "}
        <span>
          <FaLocationArrow className="" />
        </span>
      </button>
    </div>
  );
};

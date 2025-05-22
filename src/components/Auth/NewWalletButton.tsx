import { useWalletAuth } from "../../contexts/WalletAuth";

export const NewWalletButton = () => {
  const { setShowNewWalletModal } = useWalletAuth();
  return (
    <div className="flex flex-col items-center justify-center w-full my-3">
      <button
        onClick={() => setShowNewWalletModal(true)}
        className="bg-white text-black px-4 py-2 rounded-md w-[90%] cursor-pointer hover:scale-105 transition-all duration-300"
      >
        Create New Wallet
      </button>
    </div>
  );
};

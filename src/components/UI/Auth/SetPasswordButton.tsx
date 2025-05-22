import { useWalletAuth } from "../../../contexts/WalletAuth";
import { useAuth } from "../../../contexts/AuthContext";

import { saveSeedPhrase } from "../../../utils/storage/indexedDB";

export const SetPasswordButton = ({ password }: { password: string }) => {
  const { seedPhrase, address } = useWalletAuth();
  const { setCurrentUser, currentUser, setIsPasswordSet, setIsAuthenticated } =
    useAuth();
  const handleSetPassword = async () => {
    const joinedSeedPhrase = seedPhrase.join(" ");
    saveSeedPhrase(joinedSeedPhrase, password);
    localStorage.setItem("0xaddress", address);
    setIsPasswordSet(true);
    setIsAuthenticated(true);
    setCurrentUser({
      ...currentUser,
      password,
      seedPhrase: joinedSeedPhrase,
      address,
    });
  };

  return (
    <div className="w-full flex items-center justify-center pb-10">
      <button
        disabled={password.length < 8}
        onClick={handleSetPassword}
        className="text-xl text-gray-400 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        SET PASSWORD
      </button>
    </div>
  );
};

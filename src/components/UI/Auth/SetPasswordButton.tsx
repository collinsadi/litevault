import { useWalletAuth } from "../../../contexts/WalletAuth";
import { encrypt, hashPassword } from "../../../utils/encryption/encryption";
import { saveSeedPhrase } from "../../../utils/storage/indexedDB";

export const SetPasswordButton = ({ password }: { password: string }) => {
  const { seedPhrase } = useWalletAuth();

  const handleSetPassword = () => {
    const joinedSeedPhrase = seedPhrase.join(" ");
    const hashedPassword = hashPassword(password);
    saveSeedPhrase(joinedSeedPhrase, password);
    console.log(hashedPassword);
    const encrypted = encrypt(password, joinedSeedPhrase);
    console.log(encrypted);
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

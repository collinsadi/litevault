import { SeedWordContainer } from "./SeedWordContainer";
import { useWalletAuth } from "../../../contexts/WalletAuth";
import { useEffect, useState } from "react";
import { generateWallet } from "../../../utils/wallet/generateWallet";

export const SeedPhrasesContainer = () => {
  const { seedPhrase, setSeedPhrase, error, setError, setAddress } =
    useWalletAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSeedPhrase = async () => {
      try {
        setLoading(true);
        const wallet = await generateWallet();
        const phrase = wallet.mnemonic?.phrase.split(" ");

        setSeedPhrase(phrase);
        setAddress(wallet.address);
      } catch (error) {
        setError("Error generating wallet");
      } finally {
        setLoading(false);
      }
    };
    generateSeedPhrase();
  }, []);

  return (
    <div className="w-full flex  items-center justify-center gap-2 flex-wrap">
      {seedPhrase.length > 0 &&
        seedPhrase.map((word: string, index: number) => (
          <SeedWordContainer key={index} word={word} index={index + 1} />
        ))}

      {loading && (
        <div className="w-full h-[200px] flex items-center justify-center">
          <div className="spinner">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

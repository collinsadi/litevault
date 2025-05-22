import { useWalletAuth } from "../../../contexts/WalletAuth";
import { useEffect, useState } from "react";
// import { generateWallet } from "../../../utils/wallet/generateWallet";
import { NewWalletSeedInput } from "./NewWalletSeedInput";
export const NewSeedPhraseInputContainer = () => {
  const { seedPhrase, error } = useWalletAuth();
  //   const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {}, []);
  return (
    <div className="w-full flex  items-center justify-center gap-2 flex-wrap ">
      {words.map((word: string, index: number) => (
        <NewWalletSeedInput
          key={index}
          word={word}
          index={index + 1}
          setWord={(word: string) =>
            setWords((prev) => {
              const newWords = [...prev];
              newWords[index] = word;
              return newWords;
            })
          }
        />
      ))}

      {error && <p>{error}</p>}
    </div>
  );
};

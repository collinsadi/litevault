import { useWalletAuth } from "../../../contexts/WalletAuth";
import { useEffect } from "react";
import { NewWalletSeedInput } from "./NewWalletSeedInput";

export const NewSeedPhraseInputContainer = () => {
  const {error,words, setWords } = useWalletAuth();



  const handleWordChange = (index: number, word: string) => {
    setWords((prev: string[]) => {
      const newWords = [...prev];
      newWords[index] = word;
      return newWords;
    });
  };

  const handlePaste = (pastedWords: string[]) => {
    setWords((prev: string[]) => {
      const newWords = [...prev];

      pastedWords.forEach((word, index) => {
        if (index < newWords.length) {
          newWords[index] = word;
        }
      });
      return newWords;
    });
  };

  useEffect(() => {}, []);
  return (
    <div className="w-full flex  items-center justify-center gap-2 flex-wrap ">
      {words.map((word: string, index: number) => (
        <NewWalletSeedInput
          key={index}
          word={word}
          index={index + 1}
          setWord={(word: string) => handleWordChange(index, word)}
          onPaste={handlePaste}
        />
      ))}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

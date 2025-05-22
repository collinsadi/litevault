export const NewWalletSeedInput = ({
  word,
  index,
  setWord,
  onPaste,
}: {
  word: string;
  index: number;
  setWord: (word: string) => void;
  onPaste: (words: string[]) => void;
}) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const words = pastedText.trim().split(/\s+/);

    if (words.length > 0) {
      onPaste(words);
    }
  };

  return (
    <div className="w-fit bg-white rounded-md p-2 text-black flex items-center justify-center gap-2 relative">
      {/* <div
        className={`absolute top-0 left-0 w-full h-full   ${
          showSeedPhrase ? "rounded-md backdrop-blur-sm" : "opacity-0"
        }`}
      ></div> */}
      <span className="text-gray-400 text-sm">{index}</span>
      <input
        type="text"
        className="text-sm bg-transparent outline-none"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onPaste={handlePaste}
      />
    </div>
  );
};

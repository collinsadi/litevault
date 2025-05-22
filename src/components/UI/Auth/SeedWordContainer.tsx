import { useWalletAuth } from "../../../contexts/WalletAuth";

export const SeedWordContainer = ({
  word,
  index,
}: {
  word: string;
  index: number;
}) => {
  const { showSeedPhrase } = useWalletAuth();

  return (
    <div className="w-fit bg-white rounded-md p-2 text-black flex items-center justify-center gap-2 relative">
      <div
        className={`absolute top-0 left-0 w-full h-full   ${
          showSeedPhrase ? "rounded-md backdrop-blur-sm" : "opacity-0"
        }`}
      ></div>
      <span className="text-gray-400 text-sm">{index}</span>
      <h3 className="text-sm">{word}</h3>
    </div>
  );
};

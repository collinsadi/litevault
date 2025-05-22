import { Modal } from "./Modal";
// import { TransactionCard } from "./TransactionCard";
import { useToken } from "../../contexts/Token";
import { useGetBalance } from "../../hooks/useGetBalance";
import { useAuth } from "../../contexts/AuthContext";
import { formatBalanceWithCommas } from "../../utils/formatBalance";
import { formatBalance } from "../../utils/formatBalance";
import { getChainName } from "../../utils/chain";

export const TokenDetailsModal = () => {
  const { setSelectedToken, selectedToken } = useToken();
  const { currentUser } = useAuth();
  const userAddress = currentUser?.address;
  const handleClose = () => {
    setSelectedToken(null);
  };

  const balance = useGetBalance({
    address: userAddress,
    tokenAddress: selectedToken?.address as `0x${string}`,
  });

  const formattedBalance = formatBalance(
    balance ?? BigInt(0),
    selectedToken?.decimals ?? 18
  );

  return (
    <Modal
      onClose={handleClose}
      overrideHeight="h-full"
      overrideColor="bg-black"
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

        <div className="w-full flex flex-col items-center justify-center my-10">
          <h3 className="text-3xl">{selectedToken?.symbol}</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={formatBalanceWithCommas(formattedBalance)}
            disabled
          />
          <h3>YOUR BALANCE</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={selectedToken?.address}
            disabled
          />
          <h3>TOKEN ADDRESS</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={selectedToken?.name}
            disabled
          />
          <h3>TOKEN NAME</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={selectedToken?.symbol}
            disabled
          />
          <h3>TOKEN SYMBOL</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={selectedToken?.decimals}
            disabled
          />
          <h3>TOKEN DECIMALS</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={getChainName(selectedToken?.chainId ?? 11155111)}
            disabled
          />
          <h3>NETWORK</h3>
        </div>

        {/* <div className="w-full flex items-center justify-center flex-col">
          <TransactionCard />
          <TransactionCard />
        </div> */}
      </div>
    </Modal>
  );
};

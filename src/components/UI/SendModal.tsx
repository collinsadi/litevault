import { Modal } from "./Modal";
import { useReceive } from "../../contexts/Receive";
import { erc20Abi } from "viem";
import { useState } from "react";
import { ethers } from "ethers";
import { useChainId } from "wagmi";
import { useAuth } from "../../contexts/AuthContext";
import { useToken } from "../../contexts/Token";
import { getRpcUrl } from "../../utils/getRpcUrl";

export const SendModal = () => {
  const chainId = useChainId();
  const { setSendModal } = useReceive();
  const { tokens } = useToken();
  const { currentUser } = useAuth();
  const [selectedTokenAddress, setSelectedTokenAddress] =
    useState<string>("ETH");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const filteredTokens = tokens.filter(
    (token: any) => token.chainId === chainId
  );

  const getErrorMessage = (error: any): string => {
    // Handle ethers.js specific errors
    if (error?.info?.error?.message) {
      const message = error.info.error.message;

      if (message.includes("insufficient funds")) {
        return "You don't have enough funds to complete this transaction. Please check your balance.";
      }

      if (message.includes("gas required exceeds allowance")) {
        return "Transaction requires more gas than allowed. Please try with a lower amount.";
      }

      if (message.includes("execution reverted")) {
        return "Transaction failed. The token contract rejected the transaction.";
      }

      if (message.includes("nonce has already been used")) {
        return "This transaction has already been processed. Please try again.";
      }
    }

    // Handle regular error messages
    if (error instanceof Error) {
      if (error.message.includes("user rejected")) {
        return "Transaction was rejected. Please try again.";
      }

      if (error.message.includes("network")) {
        return "Network error. Please check your connection and try again.";
      }
    }

    // Default error message
    return "An error occurred while processing your transaction. Please try again.";
  };

  const handleClose = () => {
    setSendModal(false);
  };

  const sendEth = async (to: string, amountInEth: string) => {
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      const mnemonic = currentUser?.seedPhrase;
      const rpcUrl = getRpcUrl(chainId);
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const signer = ethers.Wallet.fromPhrase(mnemonic).connect(provider);

      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amountInEth),
      });

      console.log("Transaction hash:", tx.hash);

      setIsLoading(true);
      await tx.wait();
      setIsSuccess(true);
      handleReset();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!selectedTokenAddress && selectedTokenAddress !== "ETH") {
      setError("Please select a token");
      return;
    }

    if (!recipient) {
      setError("Please enter a recipient address");
      return;
    }

    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    if (!Number(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (!ethers.isAddress(recipient)) {
      setError("Please enter a valid recipient address");
      return;
    }

    if (selectedTokenAddress === "ETH") {
      await sendEth(recipient, amount);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setIsSuccess(false);

      const mnemonic = currentUser?.seedPhrase;
      const rpcUrl = getRpcUrl(chainId);
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const signer = ethers.Wallet.fromPhrase(mnemonic).connect(provider);

      const contract = new ethers.Contract(
        selectedTokenAddress,
        erc20Abi,
        signer
      );
      const contractDecimals = await contract.decimals();
      const formattedAmount = ethers.parseUnits(amount, contractDecimals);
      const tx = await contract.transfer(recipient, formattedAmount);

      setIsLoading(true);
      await tx.wait();

      console.log("Transaction hash:", tx.hash);
      setIsSuccess(true);
      handleReset();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setError("");
    setIsSuccess(false);
    setIsLoading(false);
    setRecipient("");
    setAmount("");
  };

  return (
    <Modal
      onClose={handleClose}
      overrideHeight="h-full"
      overrideColor="bg-black"
      overrideCloseButton={true}
    >
      <div className="w-full h-full flex flex-col items-center  gap-4 font-mono">
        <div className="w-full flex flex-col items-center justify-center">
          <button
            onClick={handleClose}
            className="text-xl text-gray-400 hover:text-white cursor-pointer"
          >
            CANCEL
          </button>
        </div>

        <div className="w-full flex flex-col items-center justify-center my-10">
          <h3 className="text-3xl">SEND</h3>

          <div className="flex flex-col items-center justify-center mt-5">
            {error && <p className="text-red-500">{error}</p>}
            {isSuccess && (
              <div>
                <p className="text-green-500">Transaction successful</p>
              </div>
            )}
            {isLoading && (
              <p className="text-gray-500">Processing transaction...</p>
            )}
          </div>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <select
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={selectedTokenAddress}
            onChange={(e) => setSelectedTokenAddress(e.target.value)}
          >
            <option key="ETH" value="ETH">
              ETH
            </option>
            {filteredTokens.map((token: any) => (
              <option key={token.address} value={token.address}>
                {token.name}
              </option>
            ))}
          </select>
          <h3>TOKEN</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <h3>RECIPIENT</h3>
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <h3>AMOUNT</h3>
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`text-xl text-gray-400 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed " : "hover:text-white "
            }`}
          >
            {isLoading ? "SENDING..." : "SEND"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

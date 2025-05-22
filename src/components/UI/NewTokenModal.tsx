import { Modal } from "./Modal";
import { useToken } from "../../contexts/Token";
import { useState } from "react";
import { ethers } from "ethers";
import { useChainId, useReadContract } from "wagmi";
import { erc20Abi } from "viem";

export const NewTokenModal = () => {
  const { setNewTokenModal } = useToken();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenDecimals, setTokenDecimals] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const chainId = useChainId();

  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const { setTokens, tokens } = useToken();

  const {
    data: nameData,
    isLoading: tokenNameLoading,
    error: tokenNameError,
  } = useReadContract({
    address: tokenAddress ? (tokenAddress as `0x${string}`) : undefined,
    abi: erc20Abi,
    functionName: "name",
  });

  const {
    data: symbolData,
    isLoading: tokenSymbolLoading,
    error: tokenSymbolError,
  } = useReadContract({
    address: tokenAddress ? (tokenAddress as `0x${string}`) : undefined,
    abi: erc20Abi,
    functionName: "symbol",
  });

  const {
    data: decimalsData,
    isLoading: tokenDecimalsLoading,
    error: tokenDecimalsError,
  } = useReadContract({
    address: tokenAddress ? (tokenAddress as `0x${string}`) : undefined,
    abi: erc20Abi,
    functionName: "decimals",
  });

  const handleClose = () => {
    setNewTokenModal(false);
  };

  const handleContinue = () => {
    const isValidAddress = ethers.isAddress(tokenAddress);

    if (!isValidAddress) {
      setError("Invalid token address");
      return;
    }

    if (tokenNameLoading || tokenSymbolLoading || tokenDecimalsLoading) {
      setIsLoading(true);
    }

    if (tokenNameError || tokenSymbolError || tokenDecimalsError) {
      setError("Error fetching token info");
    }

    if (nameData) {
      setTokenName(nameData);
    }

    if (symbolData) {
      setTokenSymbol(symbolData);
    }

    if (decimalsData) {
      setTokenDecimals(decimalsData.toString());
    }

    if (nameData && symbolData && decimalsData) {
      setShowMoreInfo(true);
    }
  };

  const handleAddToken = () => {
    const existingTokens = localStorage.getItem("tokens");
    const parsedExistingTokens = existingTokens
      ? JSON.parse(existingTokens)
      : [];
    const tokenAlreadyExists = tokens.find(
      (token: any) => token.address === tokenAddress
    );

    if (tokenAlreadyExists) {
      setError("Token already exists");
    }

    parsedExistingTokens.push({
      address: tokenAddress,
      name: tokenName,
      symbol: tokenSymbol,
      decimals: tokenDecimals,
      chainId: chainId,
    });

    localStorage.setItem("tokens", JSON.stringify(parsedExistingTokens));
    setTokens([
      ...tokens,
      {
        address: tokenAddress,
        name: tokenName,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        chainId: chainId,
      },
    ]);
    setNewTokenModal(false);
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
          <h3 className="text-3xl">NEW TOKEN</h3>

          {error && <h3 className="text-red-500 mt-5">{error}</h3>}
        </div>

        <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
          <input
            type="text"
            className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            disabled={isLoading || showMoreInfo}
          />
          <h3>TOKEN ADDRESS</h3>
        </div>

        {showMoreInfo && (
          <>
            <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
              <input
                type="text"
                disabled={true}
                className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
                value={tokenName}
              />
              <h3>TOKEN NAME</h3>
            </div>

            <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
              <input
                type="text"
                disabled={true}
                className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
                value={tokenSymbol}
              />
              <h3>TOKEN SYMBOL</h3>
            </div>

            <div className="w-full flex items-center justify-between border-b border-gray-700 pb-3 my-5">
              <input
                type="text"
                disabled={true}
                className=" bg-transparent border-none outline-none text-white p-2 w-[70%]"
                value={tokenDecimals}
              />
              <h3>TOKEN DECIMALS</h3>
            </div>
          </>
        )}
        <div className="w-full flex items-center justify-center">
          {showMoreInfo ? (
            <button
              onClick={handleAddToken}
              disabled={isLoading}
              className="text-xl text-gray-400 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ADD TOKEN
            </button>
          ) : (
            <button
              onClick={handleContinue}
              disabled={isLoading || !tokenAddress}
              className="text-xl text-gray-400 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              GET TOKEN INFO
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

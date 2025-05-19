import { FaEthereum } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { NewTokenButton } from "./NewTokenButton";

export const TokenList = () => {
  return (
    <div className="mb-5 mt-10 w-full">
      <div className="w-full flex items-center justify-between gap-2 my-2">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] bg-gray-500 rounded-md flex items-center justify-center">
            <FaEthereum size={20} color="black" />
          </div>

          <div>
            <h3 className="text-md font-mono text-white">ETHEREUM</h3>
          </div>
        </div>

        <div>
          <h3 className="text-md font-mono text-gray-400">3.3120502 ETH</h3>
        </div>
      </div>

      <div className="w-full flex items-center justify-between gap-2 my-2">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] bg-[#F47E60] rounded-md flex items-center justify-center">
            <IoIosFlash size={20} color="black" />
          </div>

          <div>
            <h3 className="text-md font-mono text-white">ZAP TOKEN</h3>
          </div>
        </div>

        <div>
          <h3 className="text-md font-mono text-gray-400">50. 2012021 ZAP</h3>
        </div>
      </div>

      <NewTokenButton />
    </div>
  );
};

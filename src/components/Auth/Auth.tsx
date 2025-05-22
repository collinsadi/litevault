import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Layout } from "../Layout/Layout";
import { SiLiteral } from "react-icons/si";
import { NewWalletButton } from "./NewWalletButton";
import { ImportWalletButton } from "./ImportWalletButton";
import { ConnectWalletButton } from "./ConnectWalletButton";
export const Auth = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center  h-full font-mono">
        <div className="flex flex-col items-center justify-center my-10">
          <span className="text-4xl">
            <SiLiteral />
          </span>
          <h1 className="text-2xl font-bold">Lite Vault</h1>
        </div>

        <div className="flex flex-col items-center justify-center my-10 w-full">
          <NewWalletButton />
          <ImportWalletButton />
          {/* <ConnectWalletButton /> */}
        </div>
      </div>
    </Layout>
  );
};

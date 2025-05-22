// import { ConnectButton } from "@rainbow-me/rainbowkit";ƒ
import { Layout } from "../Layout/Layout";
import { SiLiteral } from "react-icons/si";
import { NewWalletButton } from "./NewWalletButton";
import { ImportWalletButton } from "./ImportWalletButton";
// import { ConnectWalletButton } from "./ConnectWalletButton";
import { NewWalletModal } from "../UI/Auth/NewWalletModal";
import { useWalletAuth } from "../../contexts/WalletAuth";
import { EnterNewPasswordModal } from "../UI/Auth/EnterNewPasswordModal";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingAuth } from "./LoadingAuth";
import { ImportWalletModal } from "../UI/Auth/ImportWalletModal";
export const Auth = () => {
  const { showNewWalletModal, showNewPasswordModal, showImportWalletModal } =
    useWalletAuth();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === null) {
    return <LoadingAuth />;
  }

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

        {showNewWalletModal && <NewWalletModal />}
        {showNewPasswordModal && <EnterNewPasswordModal />}
        {showImportWalletModal && <ImportWalletModal />}
      </div>
    </Layout>
  );
};

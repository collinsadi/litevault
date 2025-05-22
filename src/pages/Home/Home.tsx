import { Header } from "../../components/Header/Header";
import { ActionButtons } from "../../components/Home/ActionButtons";
import { TokenList } from "../../components/Home/TokenList";
import { WalletBalance } from "../../components/Home/WalletBalance";
import { Layout } from "../../components/Layout/Layout";
import { NetworkSwitchModal } from "../../components/UI/NetworkSwitchModal";
import { NewTokenModal } from "../../components/UI/NewTokenModal";
import { TokenDetailsModal } from "../../components/UI/TokenDetailsModal";
import { ReceiveModal } from "../../components/UI/ReceiveModal";
import { useNetwork } from "../../contexts/Network";
import { useToken } from "../../contexts/Token";
import { useReceive } from "../../contexts/Receive";
import { SendModal } from "../../components/UI/SendModal";

export const Home = () => {
  const { networkModal } = useNetwork();
  const { newTokenModal, selectedToken } = useToken();
  const { receiveModal, sendModal } = useReceive();
  return (
    <Layout>
      <div className="w-full">
        <Header />
        <WalletBalance />
        <ActionButtons />
        <TokenList />
      </div>
      {networkModal && <NetworkSwitchModal />}
      {newTokenModal && <NewTokenModal />}
      {selectedToken && <TokenDetailsModal />}
      {receiveModal && <ReceiveModal />}
      {sendModal && <SendModal />}
    </Layout>
  );
};

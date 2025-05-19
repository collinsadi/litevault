import { Header } from "../../components/Header/Header";
import { ActionButtons } from "../../components/Home/ActionButtons";
import { TokenList } from "../../components/Home/TokenList";
import { WalletBalance } from "../../components/Home/WalletBalance";
import { Layout } from "../../components/Layout/Layout";
import { NetworkSwitchModal } from "../../components/UI/NetworkSwitchModal";
import { NewTokenModal } from "../../components/UI/NewTokenModal";
import { TokenDetailsModal } from "../../components/UI/TokenDetailsModal";
import { useNetwork } from "../../contexts/Network";
import { useToken } from "../../contexts/Token";

export const Home = () => {
  const { networkModal } = useNetwork();
  const { newTokenModal } = useToken();
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
      <TokenDetailsModal />
    </Layout>
  );
};

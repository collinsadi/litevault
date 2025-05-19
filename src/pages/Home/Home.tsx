import { Header } from "../../components/Header/Header";
import { ActionButtons } from "../../components/Home/ActionButtons";
import { TokenList } from "../../components/Home/TokenList";
import { WalletBalance } from "../../components/Home/WalletBalance";
import { Layout } from "../../components/Layout/Layout";
import { NetworkSwitchModal } from "../../components/UI/NetworkSwitchModal";
import { useNetwork } from "../../contexts/Network";

export const Home = () => {
  const { networkModal } = useNetwork();
  return (
    <Layout>
      <div className="w-full">
        <Header />
        <WalletBalance />
        <ActionButtons />
        <TokenList />
      </div>
      {networkModal && <NetworkSwitchModal />}
    </Layout>
  );
};

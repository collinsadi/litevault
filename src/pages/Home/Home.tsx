import { Header } from "../../components/Header/Header";
import { ActionButtons } from "../../components/Home/ActionButtons";
import { TokenList } from "../../components/Home/TokenList";
import { WalletBalance } from "../../components/Home/WalletBalance";
import { Layout } from "../../components/Layout/Layout";

export const Home = () => {
  return (
    <Layout>
      <div className="w-full">
        <Header />
        <WalletBalance />
        <ActionButtons />
        <TokenList />
      </div>
    </Layout>
  );
};

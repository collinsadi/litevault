import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Layout } from "../Layout/Layout";

export const Auth = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Welcome to the app</h1>

        <div className="flex flex-col items-center justify-center my-10">
          <ConnectButton />
        </div>
      </div>
    </Layout>
  );
};

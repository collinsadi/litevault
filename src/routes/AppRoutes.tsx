import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Auth } from "../components/Auth/Auth";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToken } from "../contexts/Token";
import { useChainId, useSwitchChain } from "wagmi";

interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  userAddress: string;
}

const AppRoutes = () => {
  const { isAuthenticated, setCurrentUser } = useAuth();
  const { setTokens, setChainId } = useToken();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  useEffect(() => {
    const address = localStorage.getItem("0xaddress");
    if (address && !isAuthenticated) {
      setCurrentUser({
        address: address,
        password: null,
        seedPhrase: "",
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const tokens = localStorage.getItem("tokens");
      const localChainId = localStorage.getItem("chainId");

      if (tokens) {
        const parsedTokens = JSON.parse(tokens);
        const filteredTokens = parsedTokens.filter(
          (token: Token) => token.chainId === chainId
        );
        setTokens([...filteredTokens]);
      }
      if (localChainId) {
        const parsedChainId = parseInt(localChainId) || 11155111;
        setChainId(parsedChainId);
        switchChain({ chainId: parsedChainId });
      }
    }
  }, [isAuthenticated, chainId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

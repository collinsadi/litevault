import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Auth } from "../components/Auth/Auth";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToken } from "../contexts/Token";

interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
}

const AppRoutes = () => {
  const { isAuthenticated, setCurrentUser } = useAuth();
  const { setTokens, setChainId } = useToken();

  useEffect(() => {
    const address = localStorage.getItem("0xaddress");
    if (address && !isAuthenticated) {
      setCurrentUser({
        address: address,
        password: null,
        seedPhrase: "",
      });
    }

    if (isAuthenticated) {
      const tokens = localStorage.getItem("tokens");
      const chainId = localStorage.getItem("chainId");

      if (tokens) {
        const parsedTokens = JSON.parse(tokens);
        setTokens((prevTokens: Token[]) => [...prevTokens, ...parsedTokens]);
      }
      if (chainId) {
        const parsedChainId = parseInt(chainId) || 11155111;
        setChainId(parsedChainId);
      }
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

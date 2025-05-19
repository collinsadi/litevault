import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Auth } from "../components/Auth/Auth";
import { useAccount } from "wagmi";

const AppRoutes = () => {
  const { isConnected } = useAccount();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isConnected ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

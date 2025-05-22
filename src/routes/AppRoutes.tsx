import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Auth } from "../components/Auth/Auth";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated, setCurrentUser } = useAuth();

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

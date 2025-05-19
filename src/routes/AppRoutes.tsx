import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Auth } from "../components/Auth/Auth";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import Home from "./routes/General/Home";
import NotFound from "./routes/General/NotFound";
import About from "./routes/General/About";
import NavbarTop from "./components/NavbarTop";

const App = () => {

  const {isLoggedIn} = useContext(AuthContext);
  return (
    <>
    {isLoggedIn && <NavbarTop />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>


  );
};


export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext  } from "react";
import AuthContext from "./contexts/AuthContext";
import Home from "./routes/General/Home";
import NotFound from "./routes/General/NotFound";
import About from "./routes/General/About";
import NavbarTop from "./components/navbartop/NavbarTop";
import { HasPermission } from "./utils/HasPermission";
import Login from "./routes/General/Login/Login";
import AddLibrarian from "./routes/settings/AddLibrarian";
import Unauthorized from "./routes/General/Unauthorized";
import AddBook from "./routes/models/AddBook";
import AddCustomer from "./routes/models/AddCustomer";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && <NavbarTop />}
      <Routes>
        <>
          {isLoggedIn && (
            <>
              <>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/customers-add" element={<AddCustomer />} />
              </>
              <>
                {HasPermission("admin") && (
                  <>
                    <Route path="/librarians-add" element={<AddLibrarian />} />
                  </>
                )}
                ;
                {!HasPermission("admin") && (
                  <>
                    <Route path="/librarians-add" element={<Unauthorized />} />
                  </>
                )}
                ;
                {HasPermission("pro") && (
                  <>
                    <Route path="/books-add" element={<AddBook />} />
                  </>
                )}
                ;
                {!HasPermission("pro") && (
                  <>
                    <Route path="/books-add" element={<Unauthorized />} />
                  </>
                )}
                ;
              </>
              <Route path="*" element={<NotFound />} />
            </>
          )}
          ;
          {!isLoggedIn && (
            <>
              <Route path="*" element={<Login />} />
            </>
          )}
          ;
        </>
      </Routes>
    </>
  );
};
export default App;

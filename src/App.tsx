import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import Home from "./routes/general/Home";
import NotFound from "./routes/general/NotFound";
import About from "./routes/general/About";
import NavbarTop from "./components/navbartop/NavbarTop";
import { HasPermission } from "./utils/HasPermission";
import Login from "./routes/login/Login";
import AddLibrarian from "./routes/settings/librarians/AddLibrarian";
import Unauthorized from "./routes/general/Unauthorized";
import AddBook from "./routes/models/books/AddBook";
import AddCustomer from "./routes/models/customers/AddCustomer";
import Customers from "./routes/models/customers/Customers";
import BookCategory from "./routes/settings/system/BookCategory";
import CustomersType from "./routes/settings/system/CustomersType";
import Logs from "./routes/settings/system/Logs";
import Librarians from "./routes/settings/librarians/Librarians";
import LibrariansDetails from "./routes/settings/librarians/LibrariansDetails";
import LibrariansEdit from "./routes/settings/librarians/LibrariansEdit.";
import { Helmet } from "react-helmet";

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
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers-add" element={<AddCustomer />} />
              </>
              <>
                {HasPermission("admin") && (
                  <>
                    <Route path="/librarians" element={<Librarians />} />
                    <Route
                      path="/librarians/:id"
                      element={<LibrariansDetails />}
                    />
                    <Route path="/librarians-add" element={<AddLibrarian />} />
                    <Route
                      path="/librarians-edit/:id"
                      element={<LibrariansEdit />}
                    />
                    <Route path="/books-category" element={<BookCategory />} />
                    <Route path="/customers-type" element={<CustomersType />} />
                    <Route path="/logs" element={<Logs />} />
                  </>
                )}
                ;
                {!HasPermission("admin") && (
                  <>
                    <Route path="/librarians" element={<Unauthorized />} />
                    <Route path="/librarians/:id" element={<Unauthorized />} />
                    <Route path="/librarians-add" element={<Unauthorized />} />
                    <Route
                      path="/librarians-edit/:id"
                      element={<Unauthorized />}
                    />
                    <Route path="/books-category" element={<Unauthorized />} />
                    <Route path="/customers-type" element={<Unauthorized />} />
                    <Route path="/lods" element={<Unauthorized />} />
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

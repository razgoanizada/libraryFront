import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Home from "./routes/general/Home";
import NotFound from "./routes/general/NotFound";
import About from "./routes/general/About";
import NavbarTop from "./components/footer and navbar/NavbarTop";
import { HasPermission } from "./utils/HasPermission";
import Login from "./routes/general/Login";
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
import Books from "./routes/models/books/Books";
import BooksEdit from "./routes/models/books/BooksEdit.";
import BooksDetails from "./routes/models/books/BookDetails";
import CustomersEdit from "./routes/models/customers/CustomersEdit";
import CustomerDetails from "./routes/models/customers/CustomerDetails";
import ChangePassword from "./routes/general/ChangePassword";
import Borrowed from "./routes/borrow/Borrowed ";
import Overdue from "./routes/borrow/Overdue";
import AddBorrow from "./routes/borrow/AddBorrow";
import Footer from "./components/footer and navbar/Footer";
import BorrowPDF from "./components/files/BorrowPDF";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (!isLoading && !isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="bg-slate-50 border">
      {isLoggedIn && <NavbarTop />}
      {isLoggedIn && (
        <Routes>
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BooksDetails />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers-add" element={<AddCustomer />} />
            <Route path="/customers-edit/:id" element={<CustomersEdit />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/borrowed" element={<Borrowed />} />
            <Route path="/overdue" element={<Overdue />} />
            <Route path="/borrow-add" element={<AddBorrow />} />
            <Route path="/borrow-pdf/:id" element={<BorrowPDF />} />
            <Route
              path="/books-add"
              element={HasPermission("pro") ? <AddBook /> : <Unauthorized />}
            />
            <Route
              path="/books-edit/:id"
              element={HasPermission("pro") ? <BooksEdit /> : <Unauthorized />}
            />
            <Route
              path="/librarians"
              element={
                HasPermission("admin") ? <Librarians /> : <Unauthorized />
              }
            />
            <Route
              path="/librarians/:id"
              element={
                HasPermission("admin") ? (
                  <LibrariansDetails />
                ) : (
                  <Unauthorized />
                )
              }
            />
            <Route
              path="/librarians-add"
              element={
                HasPermission("admin") ? <AddLibrarian /> : <Unauthorized />
              }
            />
            <Route
              path="/librarians-edit/:id"
              element={
                HasPermission("admin") ? <LibrariansEdit /> : <Unauthorized />
              }
            />
            <Route
              path="/book-categories"
              element={
                HasPermission("admin") ? <BookCategory /> : <Unauthorized />
              }
            />
            <Route
              path="/customers-types"
              element={
                HasPermission("admin") ? <CustomersType /> : <Unauthorized />
              }
            />
            <Route
              path="/logs"
              element={HasPermission("admin") ? <Logs /> : <Unauthorized />}
            />
            <Route path="*" element={<NotFound />} />
          </>
        </Routes>
      )}
      {isLoggedIn && <Footer />}
    </div>
  );
};
export default App;

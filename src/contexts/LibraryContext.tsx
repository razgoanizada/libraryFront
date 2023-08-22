import { ReactNode, createContext, useState } from "react";
import {
  BookCategoriesPage,
  CustomerTypePage,
  LogPage,
  LibrariansPage,
  BooksPage,
  CustomersPage,
  BorrowedPage,
} from "../@Typs";

interface LibraryContextState {
  categoriesPage: BookCategoriesPage[];
  setCategoriesPage: (categoriesPage: BookCategoriesPage[]) => void;
  typsPage: CustomerTypePage[];
  setTypsPage: (typsPage: CustomerTypePage[]) => void;
  logsPage: LogPage[];
  setLogsPage: (logsPage: LogPage[]) => void;
  librariansPage: LibrariansPage[];
  setLibrariansPage: (librariansPage: LibrariansPage[]) => void;
  booksPage: BooksPage[];
  setBooksPage: (booksPage: BooksPage[]) => void;
  customersPage: CustomersPage[];
  setCustomersPage: (customersPage: CustomersPage[]) => void;
  borrowedPage: BorrowedPage[];
  setBorrowedPage: (borrowedPage: BorrowedPage[]) => void;
}

const initialState: LibraryContextState = {
  categoriesPage: [],
  setCategoriesPage: () => {},
  typsPage: [],
  setTypsPage: () => {},
  logsPage: [],
  setLogsPage: () => {},
  librariansPage: [],
  setLibrariansPage: () => {},
  booksPage: [],
  setBooksPage: () => {},
  customersPage: [],
  setCustomersPage: () => {},
  borrowedPage: [],
  setBorrowedPage: () => {},
};

//create context
const LibraryContext = createContext<LibraryContextState>(initialState);

//wrapper component:
export const LibraryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoriesPage, setCategoriesPage] = useState<BookCategoriesPage[]>(
    []
  );
  const [typsPage, setTypsPage] = useState<CustomerTypePage[]>([]);
  const [logsPage, setLogsPage] = useState<LogPage[]>([]);
  const [librariansPage, setLibrariansPage] = useState<LibrariansPage[]>([]);
  const [booksPage, setBooksPage] = useState<BooksPage[]>([]);
  const [customersPage, setCustomersPage] = useState<CustomersPage[]>([]);
  const [borrowedPage, setBorrowedPage] = useState<BorrowedPage[]>([]);

  return (
    <LibraryContext.Provider
      value={{
        categoriesPage,
        setCategoriesPage,
        typsPage,
        setTypsPage,
        logsPage,
        setLogsPage,
        librariansPage,
        setLibrariansPage,
        booksPage,
        setBooksPage,
        customersPage,
        setCustomersPage,
        borrowedPage,
        setBorrowedPage,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;

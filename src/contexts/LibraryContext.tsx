import { ReactNode, createContext, useState } from "react";
import {
  BookCategoriesPage,
  CustomerTypePage,
  LogPage,
  LibrariansPage,
  BooksPage,
  CustomersPage
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
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;

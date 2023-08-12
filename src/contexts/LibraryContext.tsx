import { ReactNode, createContext, useState } from "react";
import {
  BookCategoriesPage,
  CustomerTypePage,
  LogPage,
  LibrariansPage,
  BooksPage,
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
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;

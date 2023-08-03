import { ReactNode, createContext, useState } from "react";
import { BookCategoriesPage, CustomerTypePage, LogPage } from "../@Typs";


interface LibraryContextState {
 categoriesPage : BookCategoriesPage[];
 setCategoriesPage: (categoriesPage: BookCategoriesPage[]) => void;
 typsPage : CustomerTypePage[];
 setTypsPage: (typsPage: CustomerTypePage[]) => void;
 logsPage : LogPage[];
 setLogsPage: (logsPage: LogPage[]) => void;

}

const initialState: LibraryContextState = {
    categoriesPage: [],
    setCategoriesPage: () => {},
    typsPage: [],
    setTypsPage: () => {},
    logsPage: [],
    setLogsPage: () => {},
};

//create context
const LibraryContext = createContext<LibraryContextState>(initialState);

//wrapper component:
export const LibraryContextProvider = ({ children }: { children: ReactNode }) => {
 const [categoriesPage, setCategoriesPage] = useState<BookCategoriesPage[]>([]);
 const [typsPage, setTypsPage] = useState<CustomerTypePage[]>([]);
 const [logsPage, setLogsPage] = useState<LogPage[]>([]);

 return (
   <LibraryContext.Provider value={{ categoriesPage, setCategoriesPage, typsPage, setTypsPage, logsPage, setLogsPage }}>
     {children}
   </LibraryContext.Provider>
 );
};

export default LibraryContext;

import { ReactNode, createContext, useState } from "react";
import { BookCategories, BookCategoriesPage, CustomerTypePage } from "../@Typs";


interface LibraryContextState {
 categoriesPage : BookCategoriesPage[];
 setCategoriesPage: (categoriesPage: BookCategoriesPage[]) => void;
 typsPage : CustomerTypePage[];
 setTypsPage: (typsPage: CustomerTypePage[]) => void;

}

const initialState: LibraryContextState = {
    categoriesPage: [],
    setCategoriesPage: () => {},
    typsPage: [],
    setTypsPage: () => {},
};

//create context
const LibraryContext = createContext<LibraryContextState>(initialState);

//wrapper component:
export const LibraryContextProvider = ({ children }: { children: ReactNode }) => {
 const [categoriesPage, setCategoriesPage] = useState<BookCategoriesPage[]>([]);
 const [typsPage, setTypsPage] = useState<CustomerTypePage[]>([]);

 return (
   <LibraryContext.Provider value={{ categoriesPage, setCategoriesPage, typsPage, setTypsPage }}>
     {children}
   </LibraryContext.Provider>
 );
};

export default LibraryContext;

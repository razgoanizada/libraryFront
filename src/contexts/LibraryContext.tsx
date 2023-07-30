import { ReactNode, createContext, useState } from "react";
import { BookCategories, BookCategoriesPage } from "../@Typs";


interface LibraryContextState {
 categoriesPage : BookCategoriesPage[];
 setCategoriesPage: (categoriesPage: BookCategoriesPage[]) => void;
}

const initialState: LibraryContextState = {
    categoriesPage: [],
    setCategoriesPage: () => {},
};

//create context
const LibraryContext = createContext<LibraryContextState>(initialState);

//wrapper component:
export const LibraryContextProvider = ({ children }: { children: ReactNode }) => {
 const [categoriesPage, setCategoriesPage] = useState<BookCategoriesPage[]>([]);

 return (
   <LibraryContext.Provider value={{ categoriesPage, setCategoriesPage }}>
     {children}
   </LibraryContext.Provider>
 );
};

export default LibraryContext;

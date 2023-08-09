
export interface BookCategories {
    id: number;
    name: string;
  }
  
export interface BookCategoriesPage {
    results: BookCategories[];
    totalPages: number;
    totalCategories: number;
    isFirst: boolean;
    isLast: boolean;
    pageNo: number;
    pageSize: number;
  }

  export interface CustomerType {
    id: number;
    name: string;
    days: number;
    amount: number
  }

  export interface CustomerTypePage {
    results: CustomerType[];
    totalPages: number;
    totalTypes: number;
    isFirst: boolean;
    isLast: boolean;
    pageNo: number;
    pageSize: number;
  }

  export interface Log {
    id: number;
    username: string;
    ipAddress: number;
    login: boolean;
    loginDate : Date
  }

  export interface LogPage {
    results: Log[];
    totalPages: number;
    totalLogs: number;
    isFirst: boolean;
    isLast: boolean;
    pageNo: number;
    pageSize: number;
  }

  interface Gender {
    male: string
    female: string
  }

  export interface Librarian {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone: string;
    tz: string;
    gender: Gender;
    address: string;
    dateOfBirth: Date;
    creationDate: Date;
    permission: string;
    lastLogin: Date;
    image: string,
  }

  export interface LibrariansPage {
    results: Librarian[];
    totalPages: number;
    totalLibrarians: number;
    isFirst: boolean;
    isLast: boolean;
    pageNo: number;
    pageSize: number;
  }
  
  export interface Customers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tz: string;
    gender: Gender;
    address: string;
    customerTypeName: string;
    addedByUserName: string;
    borrows: Borrows[]
    active: boolean;
    dateOfBirth: Date;
    creationDate: Date;
  }

  export interface Books {
    id: number;
    name: string;
    author: string;
    publishYear: string;
    description: string;
    bookcase: string;
    bookCategoriesName: string;
    addedByUserName: string;
    creationDate: Date;
    borrows: Borrows[]
  }

  export interface Borrows {
    id: number;
    customerId: number;
    bookId: number;
    borrowingDate: Date;
    returnDate: Date;
    retrievedOn: Date;
    returnBook: boolean;
   addedByUserName: string;
  }
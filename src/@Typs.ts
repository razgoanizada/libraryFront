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
  amount: number;
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
  loginDate: Date;
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
  male: string;
  female: string;
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
  image: string;
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

export interface Customer {
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
  borrows: Borrow[];
  active: boolean;
  dateOfBirth: Date;
  creationDate: Date;
}

export interface CustomersPage {
  results: Customer[];
  totalPages: number;
  totalCustomers: number;
  isFirst: boolean;
  isLast: boolean;
  pageNo: number;
  pageSize: number;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  publishYear: string;
  description: string;
  bookcase: string;
  bookCategoriesName: string;
  addedByUserName: string;
  creationDate: Date;
  borrows: Borrow[];
}

export interface BooksPage {
  results: Book[];
  totalPages: number;
  totalBooks: number;
  isFirst: boolean;
  isLast: boolean;
  pageNo: number;
  pageSize: number;
}

export interface Borrow {
  id: number;
  customerId: number;
  bookId: number;
  borrowingDate: Date;
  returnDate: Date;
  returnedOn: Date;
  returnBook: boolean;
  addedByUserName: string;
}

export interface BorrowedPage {
  results: Borrow[];
  totalPages: number;
  totalBorrowed: number;
  isFirst: boolean;
  isLast: boolean;
  pageNo: number;
  pageSize: number;
}

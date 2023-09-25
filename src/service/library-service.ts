import { request } from "../utils/axios-interceptors";

// Book Categories
export const BooksCategories = () =>
  request({
    url: `/books-categories`,
  });

export const BookCategoriesRequest = (pageNo: number, name: string) =>
  request({
    url: `/books-categories/page?pageNo=${pageNo}&name=${name}`,
  });

export const BookCategoriesAdd = (categoryName: string) =>
  request({
    url: `/books-categories/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: categoryName,
    },
  });

export const BookCategoriesDelete = (id: number) =>
  request({
    url: `/books-categories/${id}`,
    method: "delete",
  });

export const BookCategoriesUpdate = (categoryName: string, id: number) =>
  request({
    url: `/books-categories/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: categoryName,
    },
  });

// Customer Type

export const CustomersType = () => request({ url: `/customer-type` });

export const CustomerTypeRequest = (
  pageNo: number,
  name: string,
  days: string,
  amount: string
) =>
  request({
    url: `/customer-type/page?pageNo=${pageNo}&name=${name}&days=${days}&amount=${amount}`,
  });

export const CustomerTypeAdd = (name: string, days: number, amount: number) =>
  request({
    url: `/customer-type/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: name,
      days: days,
      amount: amount,
    },
  });

export const CustomerTypeDelete = (id: number) =>
  request({
    url: `/customer-type/${id}`,
    method: "delete",
  });

export const CustomerTypeUpdate = (days: number, amount: number, id: number) =>
  request({
    url: `/customer-type/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      days: days,
      amount: amount,
    },
  });

// logs
export const AllLogs = () => request({ url: `/logs` });

export const LogsRequest = (
  pageNo: number,
  username: string,
  isLogin: boolean,
  dateStart: string,
  dateEnd: string
) =>
  request({
    url: `/logs/page?pageNo=${pageNo}&userName=${username}&isLogin=${isLogin}&DateStart=${dateStart}&DateEnd=${dateEnd}`,
  });

// librarians

export const Librarians = () => request({ url: `/librarians` });

export const LibrariansRequest = (
  pageNo: number,
  permission: string,
  firstName: string,
  lastName: string,
  phone: string,
  tz: string,
  userName: string
) =>
  request({
    url: `/librarians/page?pageNo=${pageNo}&permission=${permission}&firstName=${firstName}&lastName=${lastName}&phone=${phone}&tz=${tz}&userName=${userName}`,
  });

export const LibrariansDelete = (id: number) =>
  request({
    url: `/librarians/${id}`,
    method: "delete",
  });

export const LibrarianIDRequest = (id: any) =>
  request({
    url: `/librarians/${id}`,
  });

export const LibrarianChangePassword = (
  newPassword: string,
  repeatNewPassword: string,
  id: number
) =>
  request({
    url: `/librarians/change-password/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      newPassword: newPassword,
      repeatNewPassword: repeatNewPassword,
    },
  });

export const LibrarianAdd = (
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  emai: string,
  phone: string,
  tz: string,
  address: string,
  dateOfBirth: Date,
  gender: string,
  permission: string
) =>
  request({
    url: `/librarians/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      email: emai,
      phone: phone,
      tz: tz,
      address: address,
      dateOfBirth: dateOfBirth,
      gender: gender,
      permission: permission,
    },
  });

export const LibrarianUpdate = (
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  dateOfBirth: Date,
  gender: string,
  permission: string,
  id: number
) =>
  request({
    url: `/librarians/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      address: address,
      dateOfBirth: dateOfBirth,
      phone: phone,
      permission: permission,
    },
  });

//books
export const Books = () => request({ url: `/books` });

export const BooksRequest = (
  pageNo: number,
  name: string,
  author: string,
  publishYear: string,
  bookcase: string,
  bookCategories: string,
  addedBy: string
) =>
  request({
    url: `/books/page?pageNo=${pageNo}&name=${name}&author=${author}&publishYear=${publishYear}&bookcase=${bookcase}&bookCategories=${bookCategories}&addedBy=${addedBy}`,
  });

export const BooksDelete = (id: number) =>
  request({
    url: `/books/${id}`,
    method: "delete",
  });

export const BookAdd = (
  name: string,
  author: string,
  publishYear: string,
  description: string,
  bookcase: string,
  bookCategoriesName: string
) =>
  request({
    url: `/books/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: name,
      author: author,
      publishYear: publishYear,
      description: description,
      bookcase: bookcase,
      bookCategoriesName: bookCategoriesName,
    },
  });

export const BookIDRequest = (id: any) =>
  request({
    url: `/books/${id}`,
  });

export const BookUpdate = (
  description: string,
  bookcase: string,
  bookCategoriesName: string,
  id: number
) =>
  request({
    url: `/books/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      description: description,
      bookcase: bookcase,
      bookCategoriesName: bookCategoriesName,
    },
  });

// customers
export const Customers = () => request({ url: `/customers` });

export const CustomersRequest = (
  pageNo: number,
  customerType: string,
  firstName: string,
  lastName: string,
  phone: string,
  tz: string,
  addedBy: string,
  isActive: boolean
) =>
  request({
    url: `/customers/page?pageNo=${pageNo}&customerType=${customerType}&firstName=${firstName}&lastName=${lastName}&phone=${phone}&tz=${tz}&addedBy=${addedBy}&isActive=${isActive}`,
  });

export const CustomerAdd = (
  firstName: string,
  lastName: string,
  emai: string,
  phone: string,
  tz: string,
  gender: string,
  address: string,
  dateOfBirth: Date,
  type: string
) =>
  request({
    url: `/customers/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      email: emai,
      phone: phone,
      tz: tz,
      gender: gender,
      address: address,
      dateOfBirth: dateOfBirth,
      customerTypeName: type,
    },
  });

export const CustomerUpdate = (
  firstName: string,
  lastName: string,
  phone: string,
  gender: string,
  address: string,
  dateOfBirth: Date,
  type: string,
  id: number
) =>
  request({
    url: `/customers/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      gender: gender,
      address: address,
      dateOfBirth: dateOfBirth,
      customerTypeName: type,
    },
  });

export const CustomerActive = (id: number) =>
  request({
    url: `/customers/active/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const CustomerIDRequest = (id: any) =>
  request({
    url: `/customers/${id}`,
  });

// borrow

export const Borrow = () => request({ url: `/borrow` });

export const BorrowRequest = (
  pageNo: number,
  customerId: string,
  bookId: string,
  addedBy: string,
  returnBook: boolean,
  borrowingDateStart: string,
  borrowingDateEnd: string,
  returnDateStart: string,
  returnDateEnd: string
) =>
  request({
    url: `/borrow/page?pageNo=${pageNo}&customerId=${customerId}&bookId=${bookId}&addedBy=${addedBy}&returnBook=${returnBook}&borrowingDateStart=${borrowingDateStart}&borrowingDateEnd=${borrowingDateEnd}&returnDateStart=${returnDateStart}&returnDateEnd=${returnDateEnd}`,
  });

export const OverdueRequest = () =>
  request({
    url: `/borrow/page?returnDateEnd=${
      new Date().toISOString().split("T")[0]
    }&pageSize=1000`,
  });

export const hasReturnBook = (id: number) =>
  request({
    url: `/borrow/return-book/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const ExtraTime = (id: number, days: number) =>
  request({
    url: `/borrow/extra-time/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      days: days,
    },
  });

export const BorrowAdd = (customerId: number, bookId: number) =>
  request({
    url: `/borrow/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      customerId: customerId,
      bookId: bookId,
    },
  });

export const BorrowIDRequest = (id: any) =>
  request({
    url: `/borrow/${id}`,
  });

// general

export const AuthChangePassword = (password: string, repeatPassword: string) =>
  request({
    url: `/change-password`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      newPassword: password,
      repeatNewPassword: repeatPassword,
    },
  });

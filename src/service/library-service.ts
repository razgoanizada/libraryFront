import { request } from "../utils/axios-interceptors";


// Book Categories
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

  export const CustomerTypeRequest = (pageNo: number, name: string, days: string, amount: string) =>
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
      amount: amount
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
      amount: amount
    },
  });

  // logs

  export const LogsRequest = (pageNo: number, username: string, isLogin: boolean, dateStart: string, dateEnd: string) =>
  request({
    url: `/logs/page?pageNo=${pageNo}&userName=${username}&isLogin=${isLogin}&DateStart=${dateStart}&DateEnd=${dateEnd}`,
  });

  // librarians

  export const LibrariansRequest = (
    pageNo: number, permission: string, firstName: string, lastName: string, phone: string, tz: string, userName: string) =>
  request({
    url: 
    `/librarians/page?pageNo=${pageNo}&permission=${permission}&firstName=${firstName}&lastName=${lastName}&phone=${phone}&tz=${tz}&userName=${userName}`,
  });

  export const LibrariansDelete = (id: number) =>
  request({
    url: `/librarians/${id}`,
    method: "delete",
  });

  export const LibrarianIDRequest = (id: any) =>
  request({
    url: 
    `/librarians/${id}`,
  });

  export const LibrarianChangePassword = (newPassword: string, repeatNewPassword: string, id: number) =>
  request({
    url: `/librarians/change-password/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      newPassword: newPassword,
      repeatNewPassword: repeatNewPassword
    },
  });

  export const LibrarianAdd = (
    firstName: string, lastName: string, userName: string, password: string, 
    emai: string, phone: string, tz: string, address: string, dateOfBirth: Date, gender: string, permission: string) =>
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
      permission: permission
    },
  });

  export const LibrarianUpdate = (firstName: string, lastName: string, phone: string,
     address: string, dateOfBirth: Date, gender: string, permission: string, id: number) =>
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
      permission: permission
    },
  });

  export const BorrowsLibrarian = (addedBy: any) => request ({
    url: `/borrow/page?pageSize=${5}&addedBy=${addedBy}`
  })

  export const CustomersLibrarian = (addedBy: any) => request ({
    url: `/customers/page?pageSize=${5}&addedBy=${addedBy}`
  })

  export const BooksLibrarian = (addedBy: any) => request ({
    url: `/books/page?pageSize=${5}&addedBy=${addedBy}`
  })


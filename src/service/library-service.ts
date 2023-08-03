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
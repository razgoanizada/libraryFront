import { request } from "../utils/axios-interceptors";

export const BookCategoriesRequest = (pageNo: number, name: string) =>
  request({
    url: `/books-categories/page?pageNo=${pageNo}&&name=${name}`,
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

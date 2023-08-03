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
  
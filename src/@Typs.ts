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

  
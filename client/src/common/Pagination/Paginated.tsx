export interface Paginated<T> {
  entities: T[];
  pageDetails: {
    hasForward: boolean;
    hasBackward: boolean;
    total: number;
  };
}

export interface PaginatedMealsRequest {
  userId: string;
  searchTerm: string;
  pageLimit: number;
  page: number;
}

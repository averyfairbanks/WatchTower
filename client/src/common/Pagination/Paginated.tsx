export interface Paginated<T> {
  entities: T[];
  pageDetails: {
    hasForward: boolean;
    hasBackward: boolean;
    total: number;
  };
}

export interface PaginatedMealsRequest {
  searchTerm: string;
  pageLimit: number;
  offset: number;
}


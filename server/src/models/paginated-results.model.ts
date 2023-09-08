export interface Paginated<T> {
  entities: T[];
  pageDetails: {
    hasForward: boolean;
    hasBackward: boolean;
    total: number;
  };
}

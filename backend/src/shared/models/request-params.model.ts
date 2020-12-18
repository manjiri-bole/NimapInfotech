

export default interface RequestModel {
  Pagination: Pagination;
}

export interface Pagination {
  Page: number;
  Limit: number;
  SortOrder: string;
  SortField: string;
}


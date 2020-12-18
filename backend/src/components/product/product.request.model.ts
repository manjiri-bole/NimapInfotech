import { Pagination } from '../../shared/models/request-params.model';
export interface ProductInfo {
    ProductId: number;
    CategoryId: number;
    ProductName: string;
}

export interface deleteProduct {
    ProductId: number;
}

export interface GetProductList {
    SearchString: string;
    Pagination: Pagination;
}
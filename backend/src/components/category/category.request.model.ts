export interface CategoryInfo {
    CategoryId: number;
    CategoryName: string;
}

export interface deleteCategory {
    CategoryId: number;
}

export interface GetCategoryList {
    SearchString: string;
}
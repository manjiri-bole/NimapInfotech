import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CategoriesService } from './categories.service';
import { BaseDataSource } from 'src/app/shared/data-source/_base.datasource';

export class CategoryDataSource extends BaseDataSource {
	public count: any;
	constructor(private categoryService: CategoriesService) {
		super();
	}

	getCategoryList(queryParams: any) {
		this.loadingSubject.next(true);
		this.categoryService.getCategoryList(queryParams).pipe(
			tap(res => {
				res = res.data;
				if (Array.isArray(res.rows) && res.rows.length) {
					this.entitySubject.next(res.rows);
				} else {
					this.entitySubject.next([]);
				}
				if (('count' in res && res.count) || (queryParams.Pagination.page === 0)) {
					this.paginatorTotalSubject.next(res.count);
				}
				this.loadingSubject.next(false);
				this.count.next(res.count);
			}),
			catchError(err => of(null)),
			finalize(() => this.loadingSubject.next(false))
		).subscribe();
	}
}

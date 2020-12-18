import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpCommonService } from 'src/app/services/http-common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private router: Router,
    private jwtHelper: JwtHelperService,
    private httpCommonService: HttpCommonService, ) {

    const token = localStorage.getItem('token');
  }

  getCategoryList(objParams) {
    return this.httpCommonService.post('category/get-category-list', objParams);
  };

  addNewCategory(objParams: any) {
    return this.httpCommonService.post('category/add-category', objParams);
  };

  updateCategory(objParams) {
    return this.httpCommonService.put('category/update-category', objParams);
  };
  deleteCategory(objParams) {
    return this.httpCommonService.delete('category/delete-category', objParams);
  };


}

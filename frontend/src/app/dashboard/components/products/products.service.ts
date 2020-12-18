import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpCommonService } from 'src/app/services/http-common.service';
import { Constants } from 'src/app/shared/services/global.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  getProductDetails(objParams: object) {
    return this.httpCommonService.post('product/get-product-details', objParams);
  }


  getCategoryList(objParams = {}) {
    return this.httpCommonService.post('category/get-category-list', objParams);
  }

  setCurrentUser() {
    throw new Error("Method not implemented.");
  }
  decodeUserFromToken(token: string) {
    throw new Error("Method not implemented.");
  }

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private httpCommonService: HttpCommonService) {

    const token = localStorage.getItem('token');
    // if (token) {
    //     const decodedUser = this.decodeUserFromToken(token);
    //     this.setCurrentUser();
    // }
  }

  getproductList(objParams) {
    return this.httpCommonService.post('product/get-product-list', objParams);
  };

  addNewProduct(objParams) {
    return this.httpCommonService.post('product/add-product', objParams);
  };

  updateProduct(objParams) {
    return this.httpCommonService.put('product/update-product', objParams);
  };

  deleteProduct(objParams) {
    return this.httpCommonService.delete('product/delete-product', objParams);
  };

  getCategorys(objParams) {
    return this.httpCommonService.post('category/get-category-list', objParams);
  };


}



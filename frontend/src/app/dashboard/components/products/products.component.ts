import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatSort } from '@angular/material';
import { ProductModel } from './products.model';
import { AddEditProductsComponent } from './add-edit-products/add-edit-products.component';
import {  MessageType, Pagination, ResponseModel, Constants, ShowAlert } from './../../../shared/services/global.service';
import { ProductsService } from '../../../dashboard/components/products/products.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProductSource } from './products.datasource';
import swal from 'sweetalert2';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit {
  public ProductForm: FormGroup;
  public objConstants = Constants;
  public dropdownSettings = {};
  public pagination = Pagination;
  public control: FormControl = new FormControl('');
  public form: FormGroup;



  public objProductModel: ProductModel;

  public loadingProductId: number;
  public dataSource: ProductSource;
  getData: any;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {
  }

  displayedColumns: string[] = ['SrNo', 'ProductName', 'CategoryName', 'Action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'statusKey',
      textField: 'statusValue',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    } as IDropdownSettings;

    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.pagination.pageSize;
    this.paginator.pageSizeOptions = this.pagination.pageSizeOptions;

    this.dataSource = new ProductSource(this.productsService);
    this.resetAndLoadProductList();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadProductList();
        })
      )
      .subscribe();
  }

  
  resetAndLoadProductList() {
    this.control.setValue('');
    this.sort.active = 'ProductId';
    this.sort.direction = 'asc';
    this.paginator.pageIndex = 0;
    this.loadProductList();
  }

  loadProductList() {
    const objParams = {
      Pagination: {
        Page: this.paginator.pageIndex,
        Limit: this.paginator.pageSize,
        SortField: this.sort.active,
        SortOrder: this.sort.direction.toUpperCase(),
      },
    };
    this.dataSource.getProducts(objParams);
  }



  getProductsDetails(objProduct: ProductModel, openDialogInMode = 'edit') {
    const objParams = {
      ProductId: objProduct.ProductId,
    };
    this.loadingProductId = objProduct.ProductId;
    const subscription = this.productsService.getproductList(objParams)
      .subscribe((objResp: ResponseModel) => {
        if (objResp && objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
          const objProductDetails = { ...objProduct, ...objResp.data };
          this.onEditProduct(objProductDetails, openDialogInMode);
        }
      }, error => {
        alert(`Unable get product ${objProduct.ProductName} details, please try again`);
      }, () => {
        setTimeout(() => {
          this.loadingProductId = undefined;
        }, 500);
        subscription.unsubscribe();
      });
  }

  onAddEditProduct() {
    this.onEditProduct(new ProductModel());
  }

  onEditProduct(objProductModel: ProductModel, openDialogInMode = 'edit') {
    const dialogRef = this.dialog.open(AddEditProductsComponent,
      { data: { objProductModel, openDialogInMode }, width: '600px', disableClose: true });


    dialogRef.afterClosed().subscribe(resp => {
      if (!resp) {
        return;
      } else {
        this.resetAndLoadProductList();
      }
    });

  }


  async deleteProduct(objProductModel: ProductModel) {
    const isConfirm = await ShowAlert(MessageType.CONFIRM,
      'Are you sure to Delete Product?',
      'You will not be able to recover the data of Product', 'Yes, delete it!');
    console.log(objProductModel)
    const objParams = {
      ProductId: objProductModel,
    };
    if (isConfirm) {
      const subscription = this.productsService.deleteProduct(objParams)
        .subscribe((objResp: ResponseModel) => {
          swal.fire(
            'Deleted!',
            objResp.message,
            'success'
          );
        }, (error) => {
          swal.fire('Failed', 'Failed to delete Product.', 'error');
        }, () => {
          subscription.unsubscribe();
          this.resetAndLoadProductList();
        });
    }
  }

}








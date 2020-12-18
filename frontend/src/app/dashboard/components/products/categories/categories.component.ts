import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { CategoryModel } from './categories.model';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import {  MessageType, Pagination, ResponseModel, Constants, ShowAlert } from '../../../../shared/services/global.service';
import { CategoriesService } from 'src/app/dashboard/components/products/categories/categories.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import swal from 'sweetalert2';
import { CategoryDataSource } from './categories.datasource';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  loadingCategoryId: number;
  objCategoryModel: CategoryModel;
  public objConstants = Constants;


  dropdownSettings = {};
  public pagination = Pagination;
  control: FormControl = new FormControl('');
  form: FormGroup;


  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,

  ) {
  }
  displayedColumns: string[] = ['SrNo', 'CategoryName', 'Action'];
  dataSource: CategoryDataSource;

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

    this.dataSource = new CategoryDataSource(this.categoriesService);
    this.resetAndLoadCategoryList();
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadCategoryList();
        })
      )
      .subscribe();
    this.resetAndLoadCategoryList();
  }

  resetAndLoadCategoryList() {
    this.control.setValue('');
    this.sort.active = 'UpdatedOn';
    this.sort.direction = 'desc';
    this.paginator.pageIndex = 0;
    this.loadCategoryList();
  }

  loadCategoryList() {
    const objParams = {};
    this.dataSource.getCategoryList(objParams);
  }

  getCategoryDetails(objCategory: CategoryModel, openDialogInMode = 'edit') {


    const objParams = {
      CategoryId: objCategory.CategoryId
    };

    this.loadingCategoryId = objCategory.CategoryId;
    const subscription = this.categoriesService.getCategoryList(objParams)
      .subscribe((objResp: ResponseModel) => {
        if (objResp && objResp.statusCode === Constants.HTTP_CODE.SUCCESS &&
          typeof objResp.data === 'object' && Object.keys(objResp.data).length) {
          const objCategoryDetails = { ...objCategory, ...objResp.data };
          this.onEditCategory(objCategoryDetails, openDialogInMode);
        }
      }, error => {
        //  alert(`Unable get category ${objCategory.CategoryName} details, please try again`);
        ShowAlert(MessageType.ERROR,
          objCategory.CategoryName,
          'Unable get category details, please try again');
      }, () => {
        setTimeout(() => {
          this.loadingCategoryId = undefined;
        }, 500);
        subscription.unsubscribe();
      });
  }

  onAddEditCategory() {
    this.onEditCategory(new CategoryModel());
  }

  onEditCategory(objCategoryModel: CategoryModel, openDialogInMode = 'edit') {
    const dialogRef = this.dialog.open(AddEditCategoryComponent,
      { data: { objCategoryModel, openDialogInMode }, width: '600px', disableClose: true });
    dialogRef.afterClosed().subscribe(resp => {
      if (!resp) {
        return;
      }
      this.resetAndLoadCategoryList();
    });
  }

  async deleteCategory(objCategory: CategoryModel) {
    console.log(objCategory)
    const isConfirm = await ShowAlert(MessageType.CONFIRM,
      'Are you sure to Delete Category?',
      'You will not be able to recover the data of Category', 'Yes, delete it!');
    const objParams = {
      CategoryId: objCategory
    };
    if (isConfirm) {
      const subscription = this.categoriesService.deleteCategory(objParams)
        .subscribe((objResp: ResponseModel) => {
          swal.fire(
            'Deleted!',
            objResp.message,
            'success'
          );
        }, (error: any) => {
          swal.fire('Failed', 'Failed to delete Category.', 'error');

        }, () => {
          subscription.unsubscribe();
          this.resetAndLoadCategoryList();
        });
    }
  }
}


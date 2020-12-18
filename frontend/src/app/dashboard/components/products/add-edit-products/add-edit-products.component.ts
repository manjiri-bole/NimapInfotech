import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ProductModel } from './../products.model';
import ProductValidationMessages from './products.validation-messages';
import { ShowAlert, GlobalService, Constants, ResponseModel, arrPackType, arrGST, MessageType } from 'src/app/shared/services/global.service';
import { ProductsService } from '../products.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {

  @Input() objProductUpdate: ProductModel;
  @Output() ProductEvent = new EventEmitter<ProductModel>();

  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public dropdownMoleculeSettings = {};
  public settings = {};
  public validationMessages = ProductValidationMessages;
  public objConstants = Constants;
  public objProductModel: ProductModel;
  public productForm: FormGroup;
  public categoryNameAutoComplete: FormControl;
  public moleculeNameAutoComplete: FormControl;

  public selected: any;

  maleculeData: any;
  setMolecule: Array<any> = [];
  getData: Array<any> = [];
  isLoading: boolean;
  filteredCategory: Array<any> = [];
  Constants = Constants;
  openDialogInMode: string;
  isProductTitleLoading: boolean;
  isFormSaving: boolean;
  isBrandTitleLoading: boolean;
  isCategoryTitleLoading: boolean;
  isMoleculeTitleLoading: boolean;
  isCompanyTitleLoading: boolean;
  filteredCompany: Array<any> = [];
  companyNameAutoComplete: FormControl;
  SearchString: string;
  displayFieldOfProductForm: FormGroup;
  objCategoryName: any;

  constructor(public dialogRef: MatDialogRef<ProductModel>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    console.log('this.objProductUpdate', this.objProductUpdate);
    this.settings = {
      singleSelection: true,
      clearable: true,
      idField: 'CategoryId',
      selectAllText: false,
      unSelectAllText: '',
      textField: 'CategoryName',
      allowSearchFilter: true,
      itemsShowLimit: 1,
      closeDropDownOnSelection: true,
    };

    this.objProductModel = Object.assign({}, this.data.objProductModel);
    if (this.objProductUpdate && Object.keys(this.objProductUpdate).length) {
      this.objProductModel = Object.assign({}, this.objProductUpdate);
    }
    console.log('this.objProductModel ADD-EDIT', this.objProductModel);

    this.onBuildForm();
    this.openDialogInMode = this.data.openDialogInMode;
    this.categoryNameAutoComplete = new FormControl('', [Validators.minLength(2), Validators.maxLength(100)]);

    this.getCategoryList();
  }

  getCategoryList() {
    const objParams = {};
    this.globalService.spinner.show();
    this.productsService.getCategoryList(objParams)
      .subscribe((objResp: ResponseModel) => {
        console.log(objResp)
        if (objResp && 'data' in objResp &&
          'count' in objResp.data && objResp.data.count) {
          this.filteredCategory = objResp.data['rows'];
          console.log("fygy", this.filteredCategory)
        }
      }, (error) => {
        //  ShowAlert(MessageType.ERROR, '', error.message);
      }, () => {
      }).add(() => {
        this.globalService.spinner.hide();
      });
  }

  onItemSeletCategory(items: any) {
    this.objCategoryName = items.CategoryName;
    this.productForm.get('CategoryId').setValue(items['CategoryId']);
  }


  onBuildForm() {
    this.productForm = this.fb.group({
      ProductId: [this.objProductModel.ProductId],
      CategoryId: [this.objProductModel.CategoryId, [Validators.required]],
      CategoryName: [this.objProductModel.CategoryName,],
      ProductName: [this.objProductModel.ProductName, [Validators.required, Validators.maxLength(255)]],
    });
    if (this.objProductModel.ProductId) {
      this.selectedItems = [
        { CategoryId: this.data.objProductModel.CategoryId, CategoryName: this.data.objProductModel.CategoryName }
      ]
    }
  }


  getCategoryId(objSelectedCategory: Object) {
    this.isCategoryTitleLoading = true;
    this.productForm.get('CategoryId').setValue(objSelectedCategory['CategoryId']);
    this.productForm.get('CategoryName').setValue(objSelectedCategory['CategoryName']);
    setTimeout(() => {
      this.isCategoryTitleLoading = false;
    }, 500);
  }


  onCancel(e) {
    if (e.clientX == 0) {
      this.globalService.markAsTouched(this.productForm.controls);
    } else {
      this.dialogRef.close();
    }
  }

  CategoryValidation() {
    const objCategoryValue = this.productForm.get('CategoryName').value;
    if (objCategoryValue == [] || objCategoryValue.length == 0) {
      this.productForm.get('CategoryName').setErrors({
        required: true
      })
    }
  }

  onSave() {
    this.CategoryValidation();
    this.globalService.markAsTouched(this.productForm.controls);
    console.log('this.productForm ---->', this.productForm);

    if (this.productForm.valid) {
      const objParams = this.productForm.value;
      // Update existing brand
      if (this.productForm.value.ProductId) {
        const subscription = this.productsService.updateProduct(objParams)
          .subscribe((objResp: any) => {
            // Check response which you are getting from backend & show alert
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
              swal.fire(
                'Update Product!',
                objResp.message,
                'success'
              );
              this.dialogRef.close(objResp.status);
            } else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
              swal.fire(objResp.message, 'error');
            } else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
              swal.fire(objResp.message, 'error');
            }
            subscription.unsubscribe();
          }, error => {
            console.log('error', error);
            swal.fire(
              'Error',
              error,
              'error'
            );
            subscription.unsubscribe();
            this.isFormSaving = false;
          },
          );
      }
      else {

        const subscription = this.productsService.addNewProduct(objParams)
          .subscribe((objResp: ResponseModel) => {
            // Check response which you are getting from backend & show alert
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
              if (this.objProductUpdate) {
                this.ProductEvent.emit(objResp.data);
              } else {
                swal.fire(
                  'Save Product!',
                  objResp.message,
                  'success'
                );
                this.dialogRef.close(objResp.data);
              }
            } else if (objResp.statusCode === Constants.HTTP_CODE.BAD_REQUEST) {
              alert(objResp.message)
              swal.fire(objResp.message, 'error');
            } else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
              swal.fire(objResp.message, 'error');
            }
          },
            error => {
              console.log('error', error);
              swal.fire(
                'Error',
                error,
                'error'
              );
              subscription.unsubscribe();
              this.isFormSaving = false;
            },
          );

      }
    }

  }


  onSelectAll(items: any) {
    console.log(items);
  }

  displayCategoryTitle(objCategory: Object) {
    this.isCategoryTitleLoading = true;
    if (objCategory && typeof objCategory === 'object' && 'CategoryName' in objCategory) {
      return objCategory['CategoryName'];
    }
    setTimeout(() => {
      this.isCategoryTitleLoading = false;
    }, 500);
    return objCategory;
  }



}

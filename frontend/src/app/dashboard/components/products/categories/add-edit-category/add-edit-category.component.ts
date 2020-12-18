import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CategoryModel } from '../categories.model';
import { GlobalService, MessageType, Constants, ResponseModel } from '../../../../../shared/services/global.service';
import { CategoriesService } from 'src/app/dashboard/components/products/categories/categories.service';
import { CustomValidator } from 'src/app/shared/validations/custom.validator';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';
import ValidationMessages from '../categories.validation-messages';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditCategoryComponent implements OnInit {

  isFormSaving: boolean;
  public objConstants = Constants;
  openDialogInMode: string;
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public validationMessages = ValidationMessages;
  fileDataOfCategoryImageNode: File = null;
  previewUrlOfCategoryImageNode: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  Constants = Constants;
  public objCategoryModel: CategoryModel;
  public categoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryModel>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.openDialogInMode = this.data.openDialogInMode;
    this.objCategoryModel = Object.assign({}, this.data.objCategoryModel);
    console.log('this.objCategoryModel ADD-EDIT', this.data);
    this.onBuildForm();
  }

  onBuildForm() {
    this.categoryForm = this.fb.group({
      CategoryId: [this.objCategoryModel.CategoryId],
      CategoryName: [this.objCategoryModel.CategoryName, [Validators.required, Validators.minLength(2), Validators.maxLength(25)
        , CustomValidator.alphaOnlyWithoutSpace, CustomValidator.alphaNumericHyphenUnderscoreSpace]],

    });
  }


  onCancel(e) {
    if (e.clientX == 0) {
      this.globalService.markAsTouched(this.categoryForm.controls);
    } else {
      this.dialogRef.close();
    }
  }



  onSave() {
    this.globalService.markAsTouched(this.categoryForm.controls);
    console.log('this.categoryForm ---->', this.categoryForm);

    if (this.categoryForm.valid) {
      const objParams = this.categoryForm.value;
console.log(objParams)
      // Update existing category

      if (this.categoryForm.value.CategoryId) {
        console.log("this", this.categoryForm.value.categoryId)
        // objParams['UpdatedByUserId'] = 19;
        const subscription = this.categoriesService.updateCategory(objParams)
          .subscribe((objResp: any) => {
            // Check response which you are getting from backend & show alert
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
              swal.fire(
                'Update category!',
                objResp.message,
                'success'
              );
              this.dialogRef.close(objResp.data);
            } else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
              swal.fire(objResp.message, 'error');
            } else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
              swal.fire(objResp.message, 'error');
            }
            subscription.unsubscribe();
          },
            error => {
              console.log('error', error);
              swal.fire(error);
              subscription.unsubscribe();
              this.isFormSaving = false;
            },
          );
      } else {
        // Add new category
        console.log("chgukhkij.ol")
        const subscription = this.categoriesService.addNewCategory(objParams)
          .subscribe((objResp: ResponseModel) => {
            console.log('objResp', objResp);

            // Check response which you are getting from backend & show alert
            if (objResp.statusCode === Constants.HTTP_CODE.SUCCESS) {
              swal.fire(
                'Save category!',
                objResp.message,
                'success'
              );
              this.dialogRef.close(objResp.data);
            } else if (objResp.statusCode === Constants.HTTP_CODE.FORBIDDEN) {
              swal.fire(objResp.message, 'error');
              console.log("error=" + objResp.message);
            } else if (objResp.statusCode === Constants.HTTP_CODE.FAILURE) {
              swal.fire(objResp.message, 'error');
            }
          },
            error => {
              console.log('error', error);
              swal.fire(error);
              subscription.unsubscribe();
              this.isFormSaving = false;
            },
          );
      }
    }
  }

}


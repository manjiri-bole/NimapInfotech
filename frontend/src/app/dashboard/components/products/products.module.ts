import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { AddEditCategoryComponent } from './categories/add-edit-category/add-edit-category.component';
import { AddEditProductsComponent } from './add-edit-products/add-edit-products.component';

@NgModule({
  declarations: [
    AddEditCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ],
  entryComponents: [
    AddEditCategoryComponent,
    AddEditProductsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductsModule { }

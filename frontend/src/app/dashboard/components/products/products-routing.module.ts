import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CategoriesComponent } from './categories/categories.component';





const childRoutes: Routes = [
  {
    path: '',
    // redirectTo: 'products',
    component: ProductsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  
];

export const routing = RouterModule.forChild(childRoutes);


@NgModule({
  declarations: [
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  entryComponents: [
    
  ],
})
export class ProductsRoutingModule { }

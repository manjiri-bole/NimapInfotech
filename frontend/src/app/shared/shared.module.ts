import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
/* components */
import { CardComponent } from './components/card/card.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
//import { ProfileComponent } from './components/profile/profile.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SwitchComponent } from './components/switch/switch.component';
import { TabContentComponent } from './components/tabset/tab-content/tab-content.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AddEditProductsComponent } from './../dashboard/components/products/add-edit-products/add-edit-products.component';
// import { MENU_ITEM } from './menu';
import { MENU_ITEM } from '../dashboard/components/dashboard-layout/dashboard-layout.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    NgxDaterangepickerMd.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxMaskModule.forRoot(options)
  ],
  declarations: [
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
   // ProfileComponent,
    AddEditProductsComponent,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
   // ProfileComponent,
    NgMultiSelectDropDownModule,
    TranslateModule,
    NgxDaterangepickerMd,
    NgxMaskModule,
    AddEditProductsComponent,

  ]
})
export class SharedModule { }

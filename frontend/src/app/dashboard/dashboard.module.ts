import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '../shared/layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { IndexComponent } from './components/index/index.component';
//import ProfileComponent from '../shared/components/profile/profile.component';

import { from } from 'rxjs';

@NgModule({
  declarations:
    [
      DashboardLayoutComponent,
      IndexComponent,
     // ProfileComponent
      
    ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    DashboardRoutingModule
  ],
  entryComponents: [
    // AddEditCustComponent,
   // ProfileComponent
  ]
})
export class DashboardModule { }

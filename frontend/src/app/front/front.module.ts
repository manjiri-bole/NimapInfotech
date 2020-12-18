import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FrontRoutingModule } from './front-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutModule } from '../shared/layout/layout.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    FrontRoutingModule    
  ]
})
export class FrontModule { }

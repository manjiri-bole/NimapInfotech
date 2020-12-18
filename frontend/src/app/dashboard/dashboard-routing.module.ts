import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { IndexComponent } from './components/index/index.component';
import { from } from 'rxjs';

let routes: Routes = [

  {
    path: '',
    component: DashboardLayoutComponent,

    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },

      {
        path: 'products',
        loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule),
      },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class DashboardRoutingModule { }

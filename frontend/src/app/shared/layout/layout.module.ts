import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { GlobalService } from '../services/global.service';
import { SharedModule } from '../shared.module';
import { ContentTopComponent } from './content-top/content-top.component';
import { FrontPagesTopComponent } from './front-pages-top/front-pages-top.component';
import { MenuComponent } from './menu/menu.component';
import { PagesTopComponent } from './pages-top/pages-top.component';
import { RightConfigComponent } from './right-config/right-config.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserProfileComponent } from './pages-top/user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    GlobalService,
  ],
  declarations: [
    MenuComponent,
    SidebarComponent,
    PagesTopComponent,
    ContentTopComponent,
    NotificationComponent,
    RightConfigComponent,
    LoadingComponent,
    FrontPagesTopComponent,
    UserProfileComponent
  ],
  exports: [
    SidebarComponent,
    PagesTopComponent,
    ContentTopComponent,
    NotificationComponent,
    RightConfigComponent,
    LoadingComponent,
    FrontPagesTopComponent,
    UserProfileComponent
  ]
})
export class LayoutModule { }

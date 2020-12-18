import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuComponent } from 'src/app/shared/layout/menu/menu.component';
import { MenuService } from 'src/app/shared/services/menu.service';
//import { MENU_ITEM } from '../../../shared/menu';
export let MENU_ITEM = [];
import { GlobalService, Pagination, ResponseModel, Constants, ShowAlert, MessageType, Status } from '../../../shared/services/global.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})

export class DashboardLayoutComponent implements OnInit {
  @Output() menuItem: EventEmitter<any> = new EventEmitter();
  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {

  }
}

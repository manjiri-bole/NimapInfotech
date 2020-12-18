import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
export const MENU_ITEM = [];
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(
        private authService: AuthService,  
    ) { }

    ngOnInit() {
       
    }
}
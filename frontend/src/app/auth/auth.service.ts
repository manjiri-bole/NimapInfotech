import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpCommonService } from 'src/app/services/http-common.service';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public item = [];
    isAdminright(): boolean {
        return true
    }
    loggedIn = false;
    isAdmin = false;

    user: Array<any>;


    constructor(
        private router: Router,
    ) {
    }
    logout() {

        this.loggedIn = false;
        this.isAdmin = false;
        this.router.navigate(['/']);
    }

}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { AuthService } from '../services/authentication/auth.service';
import { GlobalService, MessageType } from '../shared/services/global.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        // private authenticationService: AuthService,
        private objGlobalService: GlobalService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                alert('Your session has expired. Please log in again');
               //  this.authenticationService.logout();
                // location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

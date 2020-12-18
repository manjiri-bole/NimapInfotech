import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    public dataSrcMyAccount: BehaviorSubject<any> = new BehaviorSubject({});
    public obsMyAccount = this.dataSrcMyAccount.asObservable();
    private dataSource = new Subject<DataSourceClass>();

    data$ = this.dataSource.asObservable();
    public Constants = Constants;

    public dataBusChanged(ev, value) {
        this.dataSource.next({
            ev: ev,
            value: value
        });
    }

    public markAsTouched(objectControl) {
        Object.keys(objectControl).forEach(controlName => {
            if (objectControl[controlName].hasOwnProperty('controls')) {
                this.markAsTouched(objectControl[controlName].controls);
            } else {
                objectControl[controlName].markAsTouched();
            }
        });
    }

    constructor(
        public spinner: NgxSpinnerService,
        private router: Router
    ) { }
}

// Sweet alert message type
export enum MessageType {
    SUCCESS = 'success',
    ERROR = 'error',
    CONFIRM = 'warning',
    INFO = 'info',
}
const perPageSize = 10;

export const Pagination = {
    pageSize: perPageSize,
    pageSizeOptions: [5, 10, 20, 30, 40, 50],
    allowPaginationAfter: perPageSize
};



export class DataSourceClass {
    ev: string;
    value: any;
}

export const Constants = {
    SELECT_DEFAULT_LAST_DAYS: 29,
    HTTP_CODE: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORISED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        REQUEST_TIMEOUT: 408,
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        FAILURE: 520
    },
};

export class ResponseModel {
    status: string;
    data: any;
    statusCode: number;
    message: string;
}


export function ShowAlert(messageType: any, msgTitle: string, description?: any,
    // tslint:disable-next-line:align
    confirmBtnTxt = 'Ok') {
    if (messageType === MessageType.CONFIRM) {
        return Swal.fire({
            title: msgTitle,
            text: description,
            icon: messageType,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmBtnTxt
        }).then(resp => {
            return new Promise((resolve) => {
                resolve(resp.value);
            });
        });
    } else {
        return Swal.fire({
            icon: messageType,
            title: msgTitle,
            text: description,
        });
    }

}



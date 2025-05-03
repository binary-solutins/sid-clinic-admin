import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    Observable,
    of,
    Subject,
    tap,
    throwError,
} from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { AppService } from '../app/app.service';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from 'src/app/model/commonModel';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    private readonly userImageSource = new BehaviorSubject<string | null>(null);
    userImage$ = this.userImageSource.asObservable();
    private readonly errorMessage: string =
        'Something went wrong. Please try again after sometime.';
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    private readonly encryptionKey = CryptoJS.enc.Utf8.parse(
        'EA34FF3E-JU84-1974-AW70-BB81D9564426'
    );
    private readonly KEY = CryptoJS.enc.Hex.parse(
        'c604f199ff095b4ced4caf373264e84045f71b384ce39628ee8adca2b27109e8'
    );
    private readonly IV = CryptoJS.enc.Hex.parse(
        '47b5b25d579c0bed815c9166b4f37ee8'
    );
    private readonly salt = CryptoJS.enc.Base64.parse('SXZhbiBNZWR2ZWRldg==');
    private readonly iterations = 100000;
    private readonly CryptoAlgo = CryptoJS.algo.SHA512;
    private readonly logoutSubject = new Subject<void>();
    public logoutAction$ = this.logoutSubject.asObservable();
    public href: any;
    IsError: boolean = false;
    isSystemAlert: boolean = false;
    constructor(
        private readonly appService: AppService,
        private readonly http: HttpClient,
        private readonly messageService: MessageService
    ) {}

    doGet(apiUrl: String): Observable<ApiResponse> {
        const httpOptions = {
            headers: new HttpHeaders(),
        };
        let loginData = localStorage.getItem('authToken');
        if (loginData) {
            httpOptions.headers = httpOptions.headers.set(
                'Authorization',
                'Bearer ' + loginData
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Origin',
                '*'
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Methods',
                'POST, GET, OPTIONS, DELETE, PUT'
            );
        }
        const url = `${environment.BaseURL}${apiUrl}`;
        return this.http.get<ApiResponse>(url, httpOptions).pipe(
            tap(() => this.log(`doGet success`)),
            catchError((error: HttpErrorResponse) => {
                this.checkAuthorize(error);
                return throwError(() => error);
            })
        );
    }

    doPost(apiUrl: string, postData: any): Observable<ApiResponse> {
        const httpOptions = {
            headers: new HttpHeaders(),
        };
        let loginData = localStorage.getItem('authToken');
        if (loginData) {
            httpOptions.headers = httpOptions.headers.set(
                'Authorization',
                'Bearer ' + loginData
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Origin',
                '*'
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Methods',
                'POST, GET, OPTIONS, DELETE, PUT'
            );
        }
        const url = `${environment.BaseURL}${apiUrl}`;
        return this.http.post<ApiResponse>(url, postData, httpOptions).pipe(
            tap(() => this.log(`doGet success`)),
            catchError((error: HttpErrorResponse) => {
                this.checkAuthorize(error);
                return throwError(() => error);
            })
        );
    }

    doPut(apiUrl: string, putData: any): Observable<ApiResponse> {
        const httpOptions = {
            headers: new HttpHeaders(),
        };
        let loginData = localStorage.getItem('authToken');
        if (loginData) {
            httpOptions.headers = httpOptions.headers.set(
                'Authorization',
                'Bearer ' + loginData
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Origin',
                '*'
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Methods',
                'POST, GET, OPTIONS, DELETE, PUT'
            );
        }
        const url = `${environment.BaseURL}${apiUrl}`;
        return this.http.put<ApiResponse>(url, putData, httpOptions).pipe(
            tap(() => this.log(`doGet success`)),
            catchError((error: HttpErrorResponse) => {
                this.checkAuthorize(error);
                return throwError(() => error);
            })
        );
    }

    doDelete(apiUrl: String, idtoDelete: any): Observable<ApiResponse> {
        const httpOptions = {
            headers: new HttpHeaders(),
        };
        let loginData = localStorage.getItem('authToken');
        if (loginData) {
            httpOptions.headers = httpOptions.headers.set(
                'Authorization',
                'Bearer ' + loginData
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Origin',
                '*'
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Methods',
                'POST, GET, OPTIONS, DELETE, PUT'
            );
        }
        const url = `${environment.BaseURL}${apiUrl}`;
        return this.http.delete<ApiResponse>(url, httpOptions).pipe(
            tap(() => this.log(`doGet success`)),
            catchError((error: HttpErrorResponse) => {
                this.checkAuthorize(error);
                return throwError(() => error);
            })
        );
    }

    doDownloadPost(apiUrl: string, postData: any) {
        const httpOptions = {
            headers: new HttpHeaders(),
        };
        let loginData = localStorage.getItem('authToken');
        if (loginData) {
            httpOptions.headers = httpOptions.headers.set(
                'Authorization',
                'Bearer ' + loginData
            );
            httpOptions.headers = httpOptions.headers.set(
                'Access-Control-Allow-Methods',
                '*'
            );
        }
        const url = `${environment.BaseURL}${apiUrl}`;
        return this.http.post(url, postData, {
            headers: httpOptions.headers,
            observe: 'response',
            responseType: 'blob',
        });
    }

    checkAuthorize(error: any) {
        const token = localStorage.getItem('JWTToken');
        if (error.status == HttpStatusCode.Unauthorized) {
            if (this.IsError == false) {
                this.IsError = true;
                //this.toster.error(ErrorMessageConstants.Message);
            }
            //this.spinner.hide();
            if (!token) {
                this.appService.logout();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Unauthorized access',
                });
            }
            //this.dialog.closeAll();
        } else if (error.status == HttpStatusCode.Forbidden) {
            if (this.IsError == false) {
                this.IsError = true;
            }
            if (!token) {
                this.appService.logout();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Unauthorized access',
                });
            }
            //this.spinner.hide();
            //this.dialog.closeAll();
        } else if (error.status === HttpStatusCode.InternalServerError) {
            //this.toster.error(ErrorMessageConstants.Message);
            if (!token) {
                this.appService.logout();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Unauthorized access',
                });
            }
            //this.spinner.hide();
            //this.dialog.closeAll();
        }
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.checkAuthorize(error);

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        this.IsError = false;
    }

    onFormValueChange(status: any, initalValues: any, form: any): boolean {
        if (!status) {
            const initialValue = initalValues;
            let formUnchanged = Object.keys(initialValue).some(
                (key) => form[key] != initialValue[key]
            );
            return formUnchanged;
        } else {
            return false;
        }
    }

    generateCouponCode(): string {
        const length = 6;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let couponCode = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            couponCode += characters.charAt(randomIndex);
        }
        return couponCode;
    }

    setUserImage(imageSrc: string | null) {
        this.userImageSource.next(imageSrc);
    }

    getUserImage(): Observable<string | null> {
        return this.userImage$;
    }

    checkFormValidations(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            // If the control has nested form groups, you can recursively mark them as touched
            if (control instanceof FormGroup) {
                this.checkFormValidations(control);
            }
        });
    }

    private readonly formSubmittedSubject = new BehaviorSubject<boolean>(false);
    formSubmitted$ = this.formSubmittedSubject.asObservable();

    setFormSubmitted(value: boolean): void {
        this.formSubmittedSubject.next(value);
    }

    getFormSubmitted(): boolean {
        return this.formSubmittedSubject.value;
    }

    public Encrypt(clearText: string): string {
        let encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(clearText),
            this.KEY,
            {
                keySize: 128 / 8,
                iv: this.IV,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        return encodeURIComponent(encrypted.toString());
    }

    public Decrypt(cipherText: string): string {
        let decrypted = CryptoJS.AES.decrypt(
            decodeURIComponent(cipherText),
            this.KEY,
            {
                keySize: 128 / 8,
                iv: this.IV,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    isZipCodeValid(event: any) {
        let array = event?.split(' ');
        if (array.length <= 2 && array.length != 0) {
            if (event.trim() != '') {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    getTimeZone() {
        const timezoneOffset = new Date().getTimezoneOffset();
        const offset = Math.abs(timezoneOffset);
        const offsetOperator = timezoneOffset < 0 ? '+' : '-';
        const offsetHours = Math.floor(offset / 60)
            .toString()
            .padStart(2, '0');
        const offsetMinutes = Math.floor(offset % 60)
            .toString()
            .padStart(2, '0');
        return `${offsetOperator}${offsetHours}:${offsetMinutes}`;
    }

    makeDecimalRound(number: any) {
        let decimalPart = number - Math.floor(number);
        let decimalString = decimalPart.toFixed(4); // Convert decimal part to string with 2 decimal places
        let decimalDigits = parseInt(decimalString.slice(3)); // Get the digits after the decimal point

        if (decimalDigits > 5) {
            return Math.ceil(number * 100) / 100;
        } else {
            return Math.floor(number * 100) / 100;
        }
    }

    downloadPdf(apiUrl: string): Observable<Blob> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
        const url = `${environment.BaseURL}${apiUrl}`;
        return this.http.get(url, { headers, responseType: 'blob' });
    }

    downloadPdfAsPostRequest(apiUrl: string, model: any): Observable<Blob> {
        const httpOptions = {
            headers: new HttpHeaders(),
        };
        let loginData = localStorage.getItem('authToken');
        if (loginData) {
            httpOptions.headers = httpOptions.headers
                .set('Authorization', 'Bearer ' + loginData)
                .set('Access-Control-Allow-Origin', '*')
                .set(
                    'Access-Control-Allow-Methods',
                    'POST, GET, OPTIONS, DELETE, PUT'
                );
        }

        const url = `${environment.BaseURL}${apiUrl}`;

        return this.http
            .post(url, model, { ...httpOptions, responseType: 'blob' })
            .pipe(
                tap(() => this.log(`PDF download request success`)),
                catchError((error: HttpErrorResponse) => {
                    this.checkAuthorize(error); // Handle unauthorized errors
                    return throwError(() => error);
                })
            );
    }
}

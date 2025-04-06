import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    catchError,
    finalize,
    map,
    Observable,
    throwError,
} from 'rxjs';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';

@Injectable()
export class HTTPStatus {
    private readonly requestInFlight$: BehaviorSubject<boolean>;
    constructor() {
        this.requestInFlight$ = new BehaviorSubject(false);
    }

    setHttpStatus(inFlight: boolean) {
        this.requestInFlight$.next(inFlight);
    }

    getHttpStatus(): Observable<boolean> {
        return this.requestInFlight$.asObservable();
    }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
    constructor(
        private readonly router: Router,
        private readonly status: HTTPStatus
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let Spinner = document.getElementById('bootstrapSpinner');
        if (Spinner) {
            if (!req.url.includes('SavereferenceSKU')) {
                Spinner.style.display = 'block';
            }
        }

        const authReq = req.clone({
            headers: this.addExtraHeaders(req.headers),
        });

        return next.handle(authReq).pipe(
            map((event) => {
                return event;
            }),
            catchError((error) => {
                if (Spinner) {
                    Spinner.style.display = 'none';
                }
                if (error.status == 401 || error.status == 403) {
                    localStorage.clear();
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            }),
            finalize(() => {
                if (Spinner) {
                    Spinner.style.display = 'none';
                }
                this.status.setHttpStatus(false);
            })
        );
    }

    private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
        const loginData = localStorage.getItem('JWTToken');
        if (loginData) {
            headers = headers.append('Authorization', 'Bearer ' + loginData);
        }
        return headers;
    }
}

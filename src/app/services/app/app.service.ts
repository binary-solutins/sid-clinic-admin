import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    public user: any = null;
    constructor(private readonly router: Router) {}
    logout() {
        this.user = null;
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        if (!this.authService.isAccessToAdmin()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        if (state.url == '/dashboard') {
            if (!this.authService.isLoggedIn()) {
                this.router.navigate(['/login']);
                return false;
            }
        }
        if (!this.authService.isAccessToAdmin()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}

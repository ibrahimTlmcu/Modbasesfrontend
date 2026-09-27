// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService} from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        const requiredRoles = route.data['roles'] as string[]|undefined;
        if (requiredRoles && !requiredRoles.some(r => this.auth.hasRole(r))) {
            this.router.navigate(['/access-denied']);
            return false;
        }

        return true;
    }
}

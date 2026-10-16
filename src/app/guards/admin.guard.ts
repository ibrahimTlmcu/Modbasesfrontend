import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const userJson = localStorage.getItem('currentUser');
    const user = userJson ? JSON.parse(userJson) : null;

    const isAdmin = user && Array.isArray(user.roles) && (user.roles.includes('ADMIN') || user.roles.includes('ROLE_ADMIN'));

    if (isAdmin) {
        return true;
    }

    alert('Bu sayfaya erişim yetkiniz yok!');
    router.navigate(['/']);
    return false;
};

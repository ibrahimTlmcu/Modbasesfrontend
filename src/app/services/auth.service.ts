import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

// 1. DÜZELTME: Import işlemi objeden fonksiyona çevrildi
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: string;
    roles: string[];
    exp: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: string | null = null;
    private loggedIn = new BehaviorSubject<boolean>(false);
    private username = new BehaviorSubject<string | null>(null);
    private tokenKey = 'auth_token';

    constructor(private router: Router) {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            this.username.next(storedUsername);
            this.loggedIn.next(true);
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem('username');
        // Eğer token varsa onu da temizle
        localStorage.removeItem('auth_token');
        this.router.navigate(['/auth/login']);
    }

    setUser(name: string) {
        this.username.next(name);
        this.loggedIn.next(true);
        localStorage.setItem('username', name);
    }

    clearUser() {
        this.username.next(null);
        this.loggedIn.next(false);
        localStorage.removeItem('username'); // Kullanıcı adını sil
    }

    // Mevcut metodlarınız

    getUsername() {
        return this.username.asObservable();
    }

    getUsernameValue(): string | null {
        return this.username.getValue();
    }

    private setAuthToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    private getAuthToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    getRoles(): string[] {
        const token = this.getToken();
        if (!token) return [];

        // 2. DÜZELTME: any zorlaması kaldırılarak fonksiyon doğru şekilde çağrıldı
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.roles || [];
    }

    hasRole(role: string): boolean {
        return this.getRoles().includes(role);
    }
}

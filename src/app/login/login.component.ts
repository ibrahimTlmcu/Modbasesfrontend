import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    // Backend'deki CredentialsDto ile eşleşen alanlar
    loginData = {
        login: '',
        password: ''
    };

    errorMessage: string = '';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    login(): void {
        this.errorMessage = '';

        // Spring Boot AuthController içindeki @PostMapping("/login") adresine istek atıyoruz
        this.http.post<any>('http://localhost:8080/login', this.loginData).subscribe({
            next: (userDto) => {
                // 1. AdminPanelComponent ve adminGuard'ın okuduğu 'currentUser' verisini kaydet
                localStorage.setItem('currentUser', JSON.stringify(userDto));

                // 2. Eğer uygulamanın başka yerlerinde token veya username ayrı okunuyorsa onları da kaydet
                if (userDto.token) {
                    localStorage.setItem('token', userDto.token);
                }
                localStorage.setItem('username', userDto.login);

                // 3. Kullanıcının rolleri içinde 'ADMIN' var mı kontrol et
                const isAdmin = userDto.roles && Array.isArray(userDto.roles) && (userDto.roles.includes('ADMIN') || userDto.roles.includes('ROLE_ADMIN'));

                // 4. Role göre yönlendir
                if (isAdmin) {
                    this.router.navigate(['/admin']);
                } else {
                    this.router.navigate(['/dashboard']);
                }
            },
            error: (err) => {
                console.error('Giriş hatası:', err);
                this.errorMessage = 'Kullanıcı adı veya şifre hatalı!';
                alert(this.errorMessage);
            }
        });
    }
}

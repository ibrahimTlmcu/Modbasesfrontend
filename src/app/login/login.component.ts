// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    username = '';
    role: string = 'admin';

    constructor(private router: Router) {}

    login() {
        const role = this.role || 'user'; // varsayılan olarak kullanıcı
        localStorage.setItem('username', this.username);
        localStorage.setItem('role', role);

        if (role === 'admin') {
            this.router.navigate(['/tickets']);
        } else {
            this.router.navigate(['/ticket/123']); // örnek ticket yönlendirme
        }
    }

}

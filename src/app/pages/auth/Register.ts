// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AxiosService } from '../../services/axios.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RouterModule,
        RippleModule,
        DropdownModule,
        AppFloatingConfigurator
    ],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen">
            <div class="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h2 class="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
                    Hesap Oluştur
                </h2>
                <form (ngSubmit)="onRegister()">

                    <label class="block mb-2 text-gray-700 dark:text-gray-300">Ad</label>
                    <input pInputText
                           [(ngModel)]="registerData.firstName"
                           name="firstName"
                           class="w-full mb-4 p-2 border rounded" />

                    <label class="block mb-2 text-gray-700 dark:text-gray-300">Soyad</label>
                    <input pInputText
                           [(ngModel)]="registerData.lastName"
                           name="lastName"
                           class="w-full mb-4 p-2 border rounded" />

                    <label class="block mb-2 text-gray-700 dark:text-gray-300">Kullanıcı Adı</label>
                    <input pInputText
                           [(ngModel)]="registerData.login"
                           name="login"
                           class="w-full mb-4 p-2 border rounded" />

                    <label class="block mb-2 text-gray-700 dark:text-gray-300">Şifre</label>
                    <p-password
                        [(ngModel)]="registerData.password"
                        name="password"
                        placeholder="Password"
                        [toggleMask]="true"
                        styleClass="w-full mb-4"
                        [feedback]="true"
                        [fluid]="true">
                    </p-password>

                    <label class="block mb-2 text-gray-700 dark:text-gray-300">Şifreyi Tekrar Girin</label>
                    <p-password
                        [(ngModel)]="registerData.confirmPassword"
                        name="confirmPassword"
                        placeholder="Şifre"
                        [toggleMask]="true"
                        styleClass="w-full mb-4"
                        [feedback]="false"
                        [fluid]="true">
                    </p-password>

                    <p-button
                        type="submit"
                        label="Kayıt Ol"
                        styleClass="w-full">
                    </p-button>
                </form>
            </div>
        </div>
    `
})
export class Register {
    registerData = {
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        confirmPassword: '',
        role: 'USER'   // varsayılan
    };
    constructor(
        private axiosService: AxiosService,
        private router: Router
    ) {}
    async onRegister() {
        if (this.registerData.password !== this.registerData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            await this.axiosService.request('post', '/register', {
                firstName: this.registerData.firstName,
                lastName: this.registerData.lastName,
                login: this.registerData.login,
                password: this.registerData.password,
                roles: [ this.registerData.role ]   // backende array olarak gönder
            });
            alert('Registration successful! Please login.');
            this.router.navigate(['/auth/login']);
        } catch (error: any) {
            console.error('Registration failed:', error);
            alert('Registration failed! Please try again.');
        }
    }
}

// src/app/kullanici-profil/kullanici-profil.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User'; // Dosya adının küçük harfle başladığına emin olun ('../models/user')
import { Observable } from 'rxjs';
import { AxiosService } from '../services/axios.service';
import { AuthService } from '../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-kullanici-profil',
    imports: [AsyncPipe],
    templateUrl: './kullanici-profil.component.html'
})
export default class KullaniciProfilComponent implements OnInit {
    // Gelen kullanıcı verisini burada tutacağız
    currentUser: User | null = null;

    username!: Observable<string | null>;
    CurrentUsers: User[] = [];

    // SİLDİK: CurrentUser = new Observable<User | null>(); (Buna gerek yok)

    constructor(
        private userService: UserService,
        private axiosService: AxiosService,
        public AuthService: AuthService
    ) {}

    ngOnInit(): void {
        this.username = this.AuthService.getUsername();
       //bu şekilde atama yapmazsa apiden cevasbı beklemden alta geçiyo o yüzdden böyle oşlacak consolelog ile de yazmaz
        //this.currentUser$ = this.userService.getCurrentUser(); obsreble olduğu için bu da kullnıulır ancak debug aşaması zor alta iner
        this.userService.getCurrentUser().subscribe({
            next: (gelenKullanici: User) => {
                this.currentUser = gelenKullanici;
                console.log('API den başarıyla gelen veri:', this.currentUser);
                debugger;
            },
            error: (hata) => {
                console.error('Kullanıcı getirilirken hata oluştu:', hata);
            }
        });

    }
}

// src/app/kullanici-profil/kullanici-profil.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { AxiosService } from '../services/axios.service';

@Component({
    selector: 'app-kullanici-profil',
    templateUrl: './kullanici-profil.component.html'
})
export class KullaniciProfilComponent implements OnInit {
    currentUser: User | null = null;

    constructor(private userService: UserService , private axiosService: AxiosService) { }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe({
            next: (user) => {
                this.currentUser = user;
                console.log('Kullanıcı bilgisi:', this.currentUser);
            },
            error: (err) => {
                console.error('Kullanıcı bilgisi alınamadı:', err);
            }
        });
    }


    async getCurrentUser(): Promise<User> {
        try {
            console.log('Kullanıcı getiriliyor...');
            const response = await this.axiosService.request('get', '/findByLogin', '');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Kullanıcı getirme hatası:', error);
            throw error;
        }
    }


}


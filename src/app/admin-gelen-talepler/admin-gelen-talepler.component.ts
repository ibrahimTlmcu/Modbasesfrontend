import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../services/axios.service';
import {CommonModule} from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
@Component({
    selector: 'app-admin-gelen-talepler',
    templateUrl: './admin-gelen-talepler.component.html',
    imports: [CommonModule, TableModule, ButtonDirective],
    styleUrls: ['./admin-gelen-talepler.component.scss'] // styleUrl değil, style**s**Url olmalı
})
export class AdminGelenTaleplerComponent implements OnInit {
    talepler: any[] = [];

    constructor(
        private axiosService: AxiosService,
        private router: Router
    ) {}

    async talepGetir() {
        try {
            console.log('Talep Getir');
            const response = await this.axiosService.request('get', '/api/talepler', '');
            this.talepler = response.data;
            console.log(this.talepler);
        } catch (error) {
            console.log('Talep getirme hatası:', error);
        }
    }

    ngOnInit(): void {
        this.talepGetir();
    }

    cevapla(talepId: number) {
        this.router.navigate(['/admin-gelen-talep-cevapla', talepId]);
    }
    gecmisYanit(talepId : number) {
        this.router.navigate(['/talep-ve-cevap-getir', talepId]);
    }
}

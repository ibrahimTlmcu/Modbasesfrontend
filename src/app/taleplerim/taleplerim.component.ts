import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../services/axios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Button, ButtonDirective } from 'primeng/button';
import { Badge } from 'primeng/badge';

@Component({
    selector: 'app-taleplerim',
    imports: [TableModule, Card, CommonModule, Button],
    templateUrl: './taleplerim.component.html',
    styleUrls: ['./taleplerim.component.scss'],
    providers: [MessageService]
})
export class TaleplerimComponent implements OnInit {
    talepler: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private axiosService: AxiosService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.talepleriGetir();
    }

    async talepleriGetir(): Promise<void> {
        try {
            // login parametresini route'dan alıyoruz
            const login = localStorage.getItem('login');

            if (!login) {
                this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Login parametresi yok' });
                return;
            }

            console.log('TalepleriGetir for login:', login);

            // Backend URL, login parametresi ile
            const response = await this.axiosService.request('get', `/api/talepler/kullanici/${login}`, '');

            this.talepler = response.data;
            console.log('Gelen talepler:', this.talepler);
        } catch (error) {
            console.error('Talep getirme hatası:', error);
            this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Talep getirilirken hata oluştu' });
        }
    }
    git(id: number) {
        this.router.navigate(['/cevap-getir/', id]);
    }
    protected readonly Object = Object;
}

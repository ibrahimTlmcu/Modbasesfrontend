import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AxiosService } from '../services/axios.service';
import { Faq } from '../models/Faq';
import { Tooltip } from 'primeng/tooltip';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-sss-getir',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonDirective, Toast, Button, Card],
    templateUrl: './sss-getir.component.html',
    styleUrls: ['./sss-getir.component.css'],
    providers: [MessageService]
})
export class SssGetirComponent implements OnInit {
    faqList: Faq[] = [];

    constructor(
        private axiosService: AxiosService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.sssGetir();
    }
    //api faqs oalcak
    async sssGetir() {
        try {
            const resp = await this.axiosService.request('get', '/api/faqs', '');
            this.faqList = resp.data as Faq[];
        } catch (error) {
            console.error(error);
            this.messageService.add({
                severity: 'error',
                summary: 'Hata',
                detail: 'SSS listesi getirilirken bir hata oluştu.',
                life: 3000
            });
        }
    }

    async sssSil(id?: number) {
        if (!id && id !== 0) return;
        try {
            await this.axiosService.request('delete', `/api/faqs/${id}`, '');
            this.faqList = this.faqList.filter((f) => f.id !== id);

            this.messageService.add({
                severity: 'success',
                summary: 'Silme Başarılı',
                detail: 'Kayıt başarıyla silindi.',
                life: 3000
            });
        } catch (error) {
            console.error(error);
            this.messageService.add({
                severity: 'error',
                summary: 'Hata',
                detail: 'Silme işlemi sırasında bir hata oluştu.',
                life: 3000
            });
        }
    }

    sssEkleyeGit() {
        this.router.navigate(['/sss-ekle']);
    }

    duzenle(id?: number) {
        if (!id && id !== 0) return;
        this.router.navigate(['/sss-guncelle', id]);
    }

    protected readonly HTMLInputElement = HTMLInputElement;
}

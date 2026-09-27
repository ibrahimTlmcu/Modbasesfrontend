import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../services/axios.service';  // servis yolunu kendi yapına göre ayarla
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-talep-ve-cevap-getir',
    templateUrl: './talep-ve-cevap-getir.component.html',
    styleUrls: ['./talep-ve-cevap-getir.component.scss'],
    imports: [DatePipe],
    providers: [MessageService]
})
export class TalepVeCevapGetirComponent implements OnInit {
    talepId!: number;
    talep: any = null;
    cevaplar: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private axiosService: AxiosService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.talepId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.talepId) {
            this.loadTalepVeCevaplar();
        }
    }

    async loadTalepVeCevaplar() {
        try {
            const res = await this.axiosService.request('get', `/api/talepler/${this.talepId}/detay`, '');

            this.talep = res.data.talep;
            this.cevaplar = res.data.cevaplar;
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Hata',
                detail: 'Talep ve cevaplar yüklenemedi'
            });
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../services/axios.service';
import { MessageService } from 'primeng/api';
import { DatePipe, CommonModule } from '@angular/common';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-cevap-getir',
    templateUrl: './cevap-getir.component.html',
    styleUrls: ['./cevap-getir.component.scss'],
    standalone: true,
    imports: [DatePipe, CommonModule, Card],
    providers: [MessageService]
})
export class CevapGetirComponent implements OnInit {
    cevaplar: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private axiosService: AxiosService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.getCevapByTalepId(+id);
        }
    }

    async getCevapByTalepId(id: number) {
        try {
            const response = await this.axiosService.request('get', `/api/cevaplar/talep/${id}`, '');
            const dataArray = response.data;

            this.cevaplar = dataArray.map((item: any) => ({
                ...item,
                tarih: this.convertArrayToDate(item.tarih)
            }));

        } catch (error) {
            console.error('Cevap getirme hatası:', error);
        }
    }

    convertArrayToDate(arr: number[]): Date {
        return new Date(
            arr[0],
            arr[1] - 1,
            arr[2],
            arr[3],
            arr[4],
            arr[5],
            Math.floor(arr[6] / 1000000)
        );
    }
}

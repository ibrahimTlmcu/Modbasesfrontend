import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ← Bunu ekle
import { Button, ButtonDirective } from 'primeng/button';
import { AxiosService } from '../services/axios.service';
import { TableModule } from 'primeng/table';
import { KategoriEkleComponent } from '../kategori-ekle/kategori-ekle.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Card } from 'primeng/card';


@Component({
    selector: 'app-kategori-getir',
    standalone: true,
    imports: [
        CommonModule, // ← GEREKLİ
        ButtonDirective,
        TableModule,
        Toast,
        Card,
        Button
    ],
    templateUrl: './kategori-getir.component.html',
    styleUrls: ['./kategori-getir.component.scss'],
    providers: [MessageService]
})
export class KategoriGetirComponent implements OnInit {
    kategoriList: any[] = [];

    constructor(
        private axiosService: AxiosService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.kategoriGetir();
    }

    async kategoriGetir() {
        try {
            console.log('Kategori getirme islemi basladi');
            const response = await this.axiosService.request('get', '/api/kategori', '');
            console.log(response.data);
            this.kategoriList = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async kategoriSil(id: number) {
        try {
            await this.axiosService.request('delete', `/api/kategori/${id}`, '');

            // Kayıtları yenile (isteğe bağlı)
            this.kategoriList = this.kategoriList.filter((k) => k.kategoriId !== id);

            // Başarılı mesaj göster
            this.messageService.add({
                severity: 'success',
                summary: 'Silme Başarılı',
                detail: 'Kategori başarıyla silindi.',
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

    kategoriEkleyeGit() {
        this.router.navigate(['/kategori-ekle']);
    }

    duzenle(id: number) {
        this.router.navigate(['/kategori-guncelle', id]);
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AxiosService } from '../services/axios.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-kategori-guncelle',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, ToastModule],

    templateUrl: './kategori-guncelle.component.html',
    styleUrls: ['./kategori-guncelle.component.scss'],
    providers: [MessageService]
})
export class KategoriGuncelleComponent implements OnInit {
    kategoriId!: number;
    kategori: any = {
        kategoriAd: ''
    };

    constructor(
        private route: ActivatedRoute,
        private axiosService: AxiosService,
        private router: Router,
        private messageService: MessageService,
    ) {}

    async ngOnInit() {
        this.kategoriId = Number(this.route.snapshot.paramMap.get('id'));

        if (this.kategoriId) {
            const response = await this.axiosService.request('get', `/api/kategori/${this.kategoriId}`, '');
            this.kategori = response.data;
        }
    }

    async kategoriGuncelle() {

        try {
            await this.axiosService.request('put', `/api/kategori/${this.kategoriId}`, this.kategori);

            Swal.fire({
                icon: 'success',
                title: 'Kategori Güncelleme  ' ,
                text : 'Kategori  Başarıyla Güncellendi' ,
                confirmButtonText :'Tamam ',
                timer: 3000,
                timerProgressBar: true

            })

        }
        catch (error) {

            Swal.fire({
                icon: 'warning',
                title: 'Kategori Güncelleme ' ,
                text : 'Kategori Güncellenirken Hata' + error ,
                confirmButtonText :'Tamam ',
                timer: 3000,
                timerProgressBar: true

            })
        }



        this.router.navigate(['/kategori-getir']);
    }
}

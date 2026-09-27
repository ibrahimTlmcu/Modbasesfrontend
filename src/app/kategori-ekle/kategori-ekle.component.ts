import { Component } from '@angular/core';
import { AxiosService } from '../services/axios.service';
import { KategoriService } from '../services/kategori.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-kategori-ekle',
    imports: [FormsModule, InputText, ReactiveFormsModule, Button, Toast],
    templateUrl: './kategori-ekle.component.html',
    styleUrl: './kategori-ekle.component.scss',
    providers: [MessageService]
})
export class KategoriEkleComponent {
    kategori = {
        kategoriAd: ''
    };

    constructor(
        private axiosService: AxiosService,
        kategoriService: KategoriService,
        private messageService: MessageService,
        private router: Router
    ) {}

    async kategoriEkle() {
        try {
            console.log('Kategori Ekleme:', this.kategori);

            // POST isteği yap
            const response = await this.axiosService.request('post', '/api/kategori', this.kategori);

            // Başarılı mesajı göster
            this.messageService.add({
                severity: 'success',
                summary: 'Ekleme Başarılı',
                detail: 'Kategori başarıyla eklendi.',
                life: 1000,
            });

            Swal.fire({
                icon: 'success',
                title: 'Kategori Ekleme' ,
                text : 'Kategori Ekleme İşlemi Başarılı' ,
                confirmButtonText :'Tamam ',
                timer: 3000,
                timerProgressBar: true
            })


            setTimeout(() => {
                this.router.navigate(['/kategori-getir']);
            }, 1000);

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: 'error',
                title: 'Kategori Ekleme' ,
                text : 'Ekleme işlemi sırasında bir hata oluştu' ,
                confirmButtonText :'Tamam ',
                timer: 3000,
                timerProgressBar: true

            })

        }
    }

}

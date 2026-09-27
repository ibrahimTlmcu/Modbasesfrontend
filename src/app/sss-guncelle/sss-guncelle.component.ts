import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../services/axios.service';
import { Faq } from '../models/Faq';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { Button } from 'primeng/button';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sss-guncelle',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputText,
        InputTextarea,
        Button,
        Toast
    ],
    templateUrl: './sss-guncelle.component.html',
    styleUrls: ['./sss-guncelle.component.scss'],
    providers: [MessageService]
})
export class SssGuncelleComponent implements OnInit {
    faq: Faq = { question: '', answer: '' };
    private id!: number;

    constructor(
        private route: ActivatedRoute,
        private axiosService: AxiosService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.sssGetir();
    }

    async sssGetir() {
        try {
            const resp = await this.axiosService.request('get', `/api/faqs/${this.id}`, '');
            this.faq = resp.data as Faq;
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Kayıt getirilirken hata oluştu',
                confirmButtonText: 'Tamam'
            });
        }
    }

    async sssGuncelle() {
        try {
            await this.axiosService.request('put', `/api/faqs/${this.id}`, this.faq);
            this.messageService.add({
                severity: 'success',
                summary: 'Güncelleme Başarılı',
                detail: 'SSS kaydı güncellendi',
                life: 1500
            });

            Swal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Kayıt güncellendi',
                timer: 2000,
                showConfirmButton: false
            });

            setTimeout(() => {
                this.router.navigate(['/sss-getir']);
            }, 1000);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Güncelleme sırasında hata oluştu',
                confirmButtonText: 'Tamam'
            });
        }
    }
}

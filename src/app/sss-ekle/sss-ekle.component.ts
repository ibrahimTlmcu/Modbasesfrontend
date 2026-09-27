import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AxiosService } from '../services/axios.service';
import { MessageService } from 'primeng/api';

import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

import { FaqService } from '../services/faq.service';
import { Faq } from '../models/Faq';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sss-ekle',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputText, InputTextarea, Button, Toast],
    templateUrl: './sss-ekle.component.html',
    styleUrls: ['./sss-ekle.component.scss'],
    providers: [MessageService]
})
export class SssEkleComponent {
    faq: Faq = {
        question: '',
        answer: ''
    };

    constructor(
        private axiosService: AxiosService,
        private router: Router,
        private messageService: MessageService,
    ) {}

    async sssEkle() {
        try {
            console.log('SSS Ekleme:', this.faq);


            await this.axiosService.request('post', '/api/faqs', this.faq);



            // SweetAlert ile bilgi
            Swal.fire({
                icon: 'success',
                title: 'SSS Ekleme',
                text: 'Kayıt başarıyla oluşturuldu.',
                confirmButtonText: 'Tamam',
                timer: 2500,
                timerProgressBar: true,

            });


            setTimeout(() => {
                this.router.navigate(['/sss-getir']); // rotanı projene göre değiştir
            }, 1000);
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'SSS Ekleme',
                text: 'Ekleme sırasında bir hata oluştu.',
                confirmButtonText: 'Tamam',
                timer: 3000,
                timerProgressBar: true
            });
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../services/axios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Card } from 'primeng/card';
import { Panel } from 'primeng/panel';
import { Divider } from 'primeng/divider';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-gelen-talep-cevapla',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, ToastModule, Panel, Divider],
    templateUrl: './admin-gelen-talep-cevapla.component.html',
    styleUrls: ['./admin-gelen-talep-cevapla.component.scss'],
    providers: [MessageService]
})
export class AdminGelenTalepCevaplaComponent implements OnInit {
    talepId!: number;
    talep: any = null;
    cevap: string = '';
    userName: string = '';

    constructor(
        private route: ActivatedRoute,
        private axiosService: AxiosService,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService,
    ) {}

    async ngOnInit() {
        console.log('ngOnInit calsiti');
        this.talepId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.talepId) {
            try {
                const res = await this.axiosService.request('get', `/api/talepler/${this.talepId}`, '');
                this.talep = res.data;
                console.log(this.talep);
            } catch (error) {
                console.error('Talep yüklenemedi', error);
            }
        }
    }

    async talepCevapla() {
        if (!this.cevap.trim()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Uyarı',
                detail: 'Cevap boş olamaz.',
                life: 3000
            });
            return;
        }

        try {
            const cevaplayan = this.authService.getUsername;
            const cevapDTO = {
                cevapMetni: this.cevap,            // string
                cevaplayan: this.authService.getUsernameValue()  // string
            };
            await this.axiosService.request('post', `/api/cevaplar/talep/${this.talepId}`, cevapDTO);

            Swal.fire({
                icon: 'success',
                title: 'Cevap Oluşturma ' ,
                text : 'Cevabınız başarı ile kayıt edildi.' ,
                confirmButtonText :'Tamam ',
                timer: 3000,
                timerProgressBar: true
            })

            // Sayfa yönlendirme (örneğin admin gelen talepler sayfasına dön)
            setTimeout(() => {
                this.router.navigate(['/admin-gelen-talepler']);
            }, 3000);


        } catch (error) {
            console.error('Cevap gönderilemedi', error);
            Swal.fire({
                icon: 'warning',
                title: 'Cevap Oluşturma ' ,
                text : 'Cevap Gönderilirken bir hata oluştu.' + error,
                confirmButtonText :'Tamam ',
                timer: 3000,
                timerProgressBar: true
            })
        }
    }

}

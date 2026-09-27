import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { HttpClient }   from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-rating',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent {
    @Input() roomId!: string;
    @Input() rater!: string;
    @Input() rated!: string;
    @Output() submitted = new EventEmitter<void>();

    score = 0;
    comment = '';

    constructor(private http: HttpClient) { }

    setScore(n: number) {
        this.score = n;
    }

    submit() {
        if (!this.roomId || !this.rater || !this.rated) {
            Swal.fire('Uyarı','Eksik bilgi: roomId/rater/rated','warning');
            return;
        }
        if (this.score < 1 || this.score > 5) {
            Swal.fire('Uyarı','Lütfen 1-5 arası bir puan seçin','warning');
            return;
        }

        this.http.post('http://localhost:8081/api/ratings', {
            roomId: this.roomId,
            rater: this.rater,
            rated: this.rated,
            score: this.score,
            comment: this.comment
        }).subscribe({
            next: () => this.submitted.emit(),
            error: (err) => {
                if (err?.status === 409) {
                    Swal.fire('Bilgi','Bu odayı zaten puanladınız','info');
                    this.submitted.emit();
                } else if (err?.status === 403) {
                    Swal.fire('Yetkisiz','Sadece odayı açan kullanıcı puan verebilir','error');
                    this.submitted.emit();
                } else if (err?.status === 404) {
                    Swal.fire('Bulunamadı','Oda bulunamadı','error');
                } else {
                    Swal.fire('Hata','Puanlama gönderilemedi','error');
                }
            }
        });
    }
}

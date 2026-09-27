// src/app/pages/new-request/new-request.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-new-request',
    imports: [CommonModule, FormsModule],
    templateUrl: './new-request.component.html',
    styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent {
    subject = '';

    constructor(
        private rooms: RoomService,
        private auth: AuthService,
        private router: Router
    ) {}

    async create() {
        const createdBy = this.auth.getUsernameValue() || 'Anon';
        this.rooms.create(this.subject || 'Genel', createdBy).subscribe(room => {
            // oda id ile sohbet sayfasına git
            this.router.navigate(['/chat', room.id]);
        });
    }
}

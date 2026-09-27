import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room, RoomStatus } from '../models/Room';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    selector: 'app-my-rooms',
    imports: [CommonModule, FormsModule, DropdownModule, ButtonModule],
    templateUrl: './my-rooms.component.html',
    styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {
    rooms: Room[] = [];

    // ADMIN seçeneğini de kapsayacak şekilde union genişletildi
    filter: '' | 'OPEN' | 'ASSIGNED' | 'CLOSED' | 'ADMIN' = '';

    statusOptions = [
        { label: 'Admin (Tüm Odalar)', value: 'ADMIN' }, // <-- değişti
        { label: 'Tümü (Benim Odalarım)', value: '' },
        { label: 'Açık', value: 'OPEN' },
        { label: 'Atanmış', value: 'ASSIGNED' },
        { label: 'Kapalı', value: 'CLOSED' }
    ];

    constructor(
        private roomsService: RoomService,
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.load(); // varsayılan: kullanıcının odaları
    }

    // Benim odalarım (opsiyonel status filtresi)
    load() {
        const me = this.auth.getUsernameValue() || 'Anon';
        // filter 'OPEN' | 'ASSIGNED' | 'CLOSED' | '' olabilir
        const status = (this.filter === 'OPEN' || this.filter === 'ASSIGNED' || this.filter === 'CLOSED')
            ? (this.filter as RoomStatus)
            : undefined;

        this.roomsService.mine(me, status).subscribe(list => this.rooms = list);
    }

    // Admin: tüm odalar (opsiyonel status filtresi istersen burayı genişletebilirsin)
    getAllAdmin() {
        // Şu haliyle admin görünümünde status filtresi kullanmıyoruz; istersen:
        // const status = (this.filter === 'OPEN' || this.filter === 'ASSIGNED' || this.filter === 'CLOSED')
        //   ? (this.filter as RoomStatus)
        //   : undefined;
        // this.roomsService.getAll(status).subscribe(list => this.rooms = list);

        this.roomsService.getAll().subscribe(list => this.rooms = list);
    }

    // Dropdown değişince doğru kaynağı çağır
    onFilterChange() {
        if (this.filter === 'ADMIN') {
            this.getAllAdmin();
        } else {
            this.load();
        }
    }

    open(roomId: string) {
        this.router.navigate(['/gecmis', roomId]);
    }

    resume(roomId: string) {
        this.router.navigate(['/chat', roomId]);
    }
}

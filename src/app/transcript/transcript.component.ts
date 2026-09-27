import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../services/web-socket.service';
import { RoomService } from '../services/room.service';
import { ChatMessage, MessageType } from '../models/ChatMessage';
import { Room } from '../models/Room';

@Component({
    standalone: true,
    selector: 'app-transcript',
    imports: [CommonModule],
    templateUrl: './transcript.component.html',
    styleUrls: ['./transcript.component.css']
})
export class TranscriptComponent implements OnInit {
    roomId!: string;
    username!: string;
    room?: Room;
    messages: ChatMessage[] = [];
    MessageType = MessageType;

    constructor(
        private route: ActivatedRoute,
        private ws: WebSocketService,
        private rooms: RoomService,
        private router: Router
    ) {}

    ngOnInit() {
        this.roomId = this.route.snapshot.paramMap.get('roomId')!;
        this.username = 'Transcript'; // Burada canlı kullanıcı değiliz

        this.rooms.get(this.roomId).subscribe(r => this.room = r);
        this.ws.getHistory(this.roomId).subscribe(list => this.messages = list ?? []);
    }

    getAvatarColor(name: string) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `hsl(${hash % 360}, 70%, 50%)`;
        return color;
    }

    openInNew(url: string) {
        window.open(url, '_blank');
    }

    resume() {
        this.router.navigate(['/chat', this.roomId]);
    }

    back() {
        this.router.navigate(['/canli-talepler']);
    }
}

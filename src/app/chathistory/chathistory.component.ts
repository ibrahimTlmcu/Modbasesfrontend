import { Component, Input, OnInit } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { HttpClient }                from '@angular/common/http';
import { Observable }                from 'rxjs';
import { ChatMessage, MessageType }  from '../models/ChatMessage';

@Component({
    selector: 'app-chat-history',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chat-history.component.html',
    styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {
    /** Dışarıdan hangi ticketId için geçmişi göstereceğiz */
    @Input() ticketId!: string;

    history$!: Observable<ChatMessage[]>;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.history$ = this.http.get<ChatMessage[]>(
            `http://localhost:8081/api/chat/${this.ticketId}/history`
        );
    }

    /** Zaman damgasını okunabilir formata çevir */
    formatTimestamp(ts: string): string {
        return new Date(ts).toLocaleString();
    }

    /** Eğer varsa JOIN/LEAVE değil, sadece CHAT mesajları listelensin */
    isChat(msg: ChatMessage): boolean {
        return msg.type === MessageType.CHAT;
    }
}

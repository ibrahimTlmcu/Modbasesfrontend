// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SupportTicket {
    id: string;
    user: string;         // kullanıcı adı
    expert: string|null;  // atanmış uzman
    subject: string;      // konu
    resolved: boolean;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
    private base = 'http://localhost:8081/ticket';

    constructor(private http: HttpClient) {}

    // Kullanıcı tarafından çağrılır
    create(username: string, subject: string): Observable<SupportTicket> {
        return this.http.post<SupportTicket>(
            `${this.base}/create?username=${username}&expert=&subject=${encodeURIComponent(subject)}`,
            {}
        );
    }

    // Uzman liste ekranff
    getOpen(): Observable<SupportTicket[]> {
        return this.http.get<SupportTicket[]>(`${this.base}/open`);
    }//Kontrole burdan başla


    // Uzman bir talebe katılırken çağrılır
    assign(ticketId: string, expert: string): Observable<SupportTicket> {
        return this.http.post<SupportTicket>(
            `${this.base}/assign?ticketId=${ticketId}&expert=${expert}`,
            {}
        );
    }
}

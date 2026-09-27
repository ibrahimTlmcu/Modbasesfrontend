// src/app/ticket-list/ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router }             from '@angular/router';
import { TicketService, SupportTicket } from '../services/ticket.service';
import { NgForOf } from '@angular/common';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-ticket-list',
    imports: [NgForOf, ButtonDirective],
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
    tickets: SupportTicket[] = [];
    expertName = 'expert1'; // sabit örnek uzman adı

    constructor(
        private ticketSvc: TicketService,
        protected router: Router
    ) {}

    ngOnInit() {
        this.loadOpenTickets();
    }

    loadOpenTickets() {
        this.ticketSvc.getOpen().subscribe((a) => {
            // 'a' artık SupportTicket[] dizisi
            this.tickets = a;

            // Konsola bakarak inceleyin:
            console.log(a);

            // Örnek: dizinin ilk elemanını alın
            const firstTicket = a[0];
            console.log('İlk ticket:', firstTicket);

            // Örnek: forEach ile tümünü listeleyin
            a.forEach((ticket, index) => {
                console.log(`${index}. ticket:`, ticket);
            });
        });
    }

    join(ticket: SupportTicket) {
        this.ticketSvc.assign(ticket.id, this.expertName).subscribe(() => {
            this.router.navigate(['/chat', ticket.id]);
        });

    }
}

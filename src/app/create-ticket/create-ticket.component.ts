import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { Router }            from '@angular/router';
import { TicketService }     from '../services/ticket.service';
import {AuthService} from '../services/auth.service';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-create-ticket',
    standalone: true,
    imports: [CommonModule, FormsModule,],
    templateUrl: './create-ticket.component.html',
    styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
    username!: string; // AuthService’ten gelecek
    subject = ''; // kullanıcıdan formla alınacak

    constructor(
        private ticketSvc: TicketService,
        private auth: AuthService,
        protected router: Router
    ) {}

    ngOnInit() {
        const name = this.auth.getUsernameValue();
        if (!name) {
            this.router.navigate(['/login']);
            return;
        }
        this.username = name;
    }

    createTicket() {
        if (!this.subject.trim()) {
            return;
        }
        this.ticketSvc.create(this.username, this.subject).subscribe((ticket) => {
            this.router.navigate(['/chat', ticket.id]);
        });
    }
}

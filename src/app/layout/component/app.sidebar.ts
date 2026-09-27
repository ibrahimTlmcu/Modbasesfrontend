import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu],
    template: ` <div class="layout-sidebar">
        <app-menu></app-menu>
    </div>`
})
export class AppSidebar {
    constructor(public el: ElementRef
    ,private authService: AuthService,
    ) {}

    onLogout() {
        this.authService.logout();
    }

}

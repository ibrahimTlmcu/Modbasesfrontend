import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Ana Sayfa', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                    { label: 'Dokümantasyon', icon: 'pi pi-fw pi-book', routerLink: ['/documentation'] }
                ]
            },

            { separator: true } as any,



            { separator: true } as any,

            {
                label: 'Talepler',
                items: [
                    { label: 'Talep Aç', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/talep-ac'] },
                    { label: 'Taleplerim', icon: 'pi pi-fw pi-inbox', routerLink: ['/taleplerim'] },

                    { label: 'Canlı Talepler', icon: 'pi pi-fw pi-bolt', routerLink: ['/canli-talepler'] },
                    { label: 'Yeni Talep (Room)', icon: 'pi pi-fw pi-comment', routerLink: ['/new-request'] },


                ]
            },

            { separator: true } as any,

            {
                label: 'SSS & Kategori',
                items: [

                    { label: 'SSS Listesi', icon: 'pi pi-fw pi-question-circle', routerLink: ['/sss-getir'] },

                    { label: 'Kategori Listesi', icon: 'pi pi-fw pi-tag', routerLink: ['/kategori-getir'] }
                ]
            },

            { separator: true } as any,



            { separator: true } as any,

            {
                label: 'Yönetim',
                items: [
                    { label: 'Admin Gelen Talepler', icon: 'pi pi-fw pi-briefcase', routerLink: ['/admin-gelen-talepler'] }
                ]
            },

            { separator: true } as any,

            {
                label: 'Hesap',
                items: [
                    { label: 'Profil', icon: 'pi pi-fw pi-user', routerLink: ['/kullanici-profil'] },
                    {
                        label: 'Çıkış Yap',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => {
                            this.authService.logout();
                            this.router.navigate(['/auth/login/']);
                        }
                    }
                ]
            }
        ];
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';
import { ModService, Category } from '../../services/mod.service'; // ModService yolunu projenize göre kontrol edin

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
    `,
    styles: [
        `
            @keyframes blinkRed {
                0%,
                100% {
                    color: inherit;
                    background-color: transparent;
                }
                50% {
                    color: #ff0000 !important;
                    fill: #ff0000 !important;
                    font-weight: 900 !important;
                    text-shadow: 0 0 10px red !important;
                    background-color: rgba(255, 0, 0, 0.15) !important;
                    border-radius: 8px;
                }
            }

            ::ng-deep .blinking-red,
            ::ng-deep .blinking-red * {
                animation: blinkRed 1s infinite !important;
                transition: none !important;
            }
        `
    ]
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private modService: ModService
    ) {}

    ngOnInit() {
        // Önce sabit menü iskeletini oluşturuyoruz, ardından veritabanından kategorileri çekip içine yerleştiriyoruz
        this.loadDynamicMenu();
    }

    loadDynamicMenu() {
        this.modService.getCategories().subscribe({
            next: (categories: Category[]) => {
                // 1. "Oyunlar" grubundaki kategorileri filtrele ve MenuItem formatına çevir
                const oyunKategorileri: MenuItem[] = categories
                    .filter((c) => c.mainGroup === 'Oyunlar')
                    .map((c) => ({
                        label: c.name,
                        icon: this.getCategoryIcon(c.slug),
                        routerLink: ['/' + c.slug],
                        // ETS 2 için yanıp sönme efektini koruyoruz
                        styleClass: c.slug.includes('ets2') ? 'blinking-red' : ''
                    }));

                // 2. "Programlar" grubundaki kategorileri filtrele ve MenuItem formatına çevir
                const programKategorileri: MenuItem[] = categories
                    .filter((c) => c.mainGroup === 'Programlar')
                    .map((c) => ({
                        label: c.name,
                        icon: 'pi pi-fw pi-desktop',
                        routerLink: ['/' + c.slug]
                    }));

                // Менüyü oluştur
                this.buildMenu(oyunKategorileri, programKategorileri);
            },
            error: (err) => {
                console.error('Kategoriler yüklenirken hata oluştu, varsayılan menü yükleniyor:', err);
                this.buildMenu([], []);
            }
        });
    }

    buildMenu(oyunItems: MenuItem[], programItems: MenuItem[]) {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Ana Sayfa', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },

                ]
            },

            { separator: true } as any,

            {
                label: 'Oyunlar - Modlar',
                items: [
                    // Veritabanından gelen oyun kategorileri buraya dizilir
                    ...oyunItems
                    // Sabit kalan Yeni Talep menüsü en altta durmaya devam eder
                    //      { label: 'Yeni Talep (Room)', icon: 'pi pi-fw pi-comment', routerLink: ['/new-request'] }
                ]
            },

            { separator: true } as any,

            {
                label: 'Araçlar',
                items: [
                    // Veritabanından gelen program kategorileri buraya dizilir
                    ...programItems,
                    // Eğer veritabanında henüz "Programlar" kategorisi yoksa sabit linki koru:
                    ...(programItems.length === 0 ? [{ label: 'Programlar', icon: 'pi pi-fw pi-question-circle', routerLink: ['/programlar'] }] : []),

                ]
            },

            { separator: true } as any,

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

    // Kategori slug'ına göre mevcut ikonlarınızı atayan yardımcı metod
    private getCategoryIcon(slug: string): string {
        if (slug.includes('ets2')) return 'pi pi-fw pi-plus-circle';
        if (slug.includes('bannerlord')) return 'pi pi-fw pi-inbox';
        if (slug.includes('minecraft')) return 'pi pi-fw pi-bolt';
        return 'pi pi-fw pi-folder'; // Yeni eklenecek diğer oyunlar için varsayılan ikon
    }
}

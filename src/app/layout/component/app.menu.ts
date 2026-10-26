
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, filter, takeUntil } from 'rxjs';

import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';
import { ModService, Category } from '../../services/mod.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem
                    *ngIf="!item.separator"
                    [item]="item"
                    [index]="i"
                    [root]="true">
                </li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `,
    styles: [`
      @keyframes blinkRed {
        0%, 100% {
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
    `]
})
export class AppMenu implements OnInit, OnDestroy {

    model: MenuItem[] = [];

    private destroy$ = new Subject<void>();
    private currentLang = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private modService: ModService,
        private languageService: LanguageService
    ) {}

    ngOnInit(): void {
        this.currentLang = this.languageService.currentLanguage;
        this.loadDynamicMenu();

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            const newLang = this.languageService.currentLanguage;

            if (newLang !== this.currentLang) {
                this.currentLang = newLang;
                this.loadDynamicMenu();
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private localizedLink(...segments: string[]): string[] {
        return this.languageService.localizedRoute(...segments);
    }

    loadDynamicMenu(): void {
        const requestedLang = this.languageService.currentLanguage;

        this.modService.getCategories().subscribe({
            next: (categories: Category[]) => {

                // Eski dil isteği daha geç dönerse menüyü bozmasın.
                if (requestedLang !== this.languageService.currentLanguage) {
                    return;
                }

                // DeepL tarafından çevrilmiş ana grup isimleri
                const programGroups = [
                    'programlar',
                    'programlar ve araçlar',
                    'programs',
                    'programs and tools',
                    'programme',
                    'programme und werkzeuge',
                    'programme und tools'
                ];

                const isProgram = (category: Category): boolean => {
                    const group = (category.mainGroup || '')
                        .trim()
                        .toLocaleLowerCase();

                    return programGroups.includes(group);
                };

                const oyunKategorileri: MenuItem[] = categories
                    .filter(c => !isProgram(c))
                    .map(c => ({
                        label: c.name,
                        icon: this.getCategoryIcon(c.slug),
                        routerLink: this.localizedLink(c.slug),
                        styleClass: c.slug.includes('ets2')
                            ? 'blinking-red'
                            : ''
                    }));

                const programKategorileri: MenuItem[] = categories
                    .filter(c => isProgram(c))
                    .map(c => ({
                        label: c.name,
                        icon: 'pi pi-fw pi-desktop',
                        routerLink: this.localizedLink(c.slug)
                    }));

                this.buildMenu(oyunKategorileri, programKategorileri);
            },

            error: (err) => {
                console.error('Kategoriler yüklenemedi:', err);

                if (requestedLang === this.languageService.currentLanguage) {
                    this.buildMenu([], []);
                }
            }
        });
    }

    buildMenu(
        oyunItems: MenuItem[],
        programItems: MenuItem[]
    ): void {

        const lang = this.languageService.currentLanguage;

        const labels = {
            tr: {
                home: 'Ana Sayfa',
                games: 'Oyunlar - Modlar',
                tools: 'Araçlar',
                programs: 'Programlar',
                account: 'Hesap',
                profile: 'Profil',
                logout: 'Çıkış Yap'
            },
            en: {
                home: 'Home',
                games: 'Games - Mods',
                tools: 'Tools',
                programs: 'Programs',
                account: 'Account',
                profile: 'Profile',
                logout: 'Log Out'
            },
            de: {
                home: 'Startseite',
                games: 'Spiele - Mods',
                tools: 'Werkzeuge',
                programs: 'Programme',
                account: 'Konto',
                profile: 'Profil',
                logout: 'Abmelden'
            }
        }[lang];

        this.model = [
            {
                label: labels.home,
                items: [
                    {
                        label: labels.home,
                        icon: 'pi pi-fw pi-home',
                        routerLink: this.localizedLink('dashboard')
                    }
                ]
            },

            { separator: true },

            {
                label: labels.games,
                items: [...oyunItems]
            },

            { separator: true },

            {
                label: labels.tools,
                items: [
                    ...programItems,
                    ...(programItems.length === 0 ? [{
                        label: labels.programs,
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: this.localizedLink('programlar')
                    }] : [])
                ]
            },

            { separator: true },

            {
                label: labels.account,
                items: [
                    {
                        label: labels.profile,
                        icon: 'pi pi-fw pi-user',
                        routerLink: this.localizedLink('kullanici-profil')
                    },
                    {
                        label: labels.logout,
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

    private getCategoryIcon(slug: string): string {
        if (slug.includes('ets2')) return 'pi pi-fw pi-plus-circle';
        if (slug.includes('bannerlord')) return 'pi pi-fw pi-inbox';
        if (slug.includes('minecraft')) return 'pi pi-fw pi-bolt';

        return 'pi pi-fw pi-folder';
    }
}

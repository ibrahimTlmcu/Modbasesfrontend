import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/Room';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../services/language.service';
import { Observable, timer, of } from 'rxjs';
import { map, shareReplay, switchMap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, TranslatePipe],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="layout-topbar modern-red-topbar">
            <div class="layout-topbar-logo-container">
                <button class="layout-menu-button layout-topbar-action glass-btn" (click)="layoutService.onMenuToggle()">
                    <i class="pi pi-bars"></i>
                </button>

                <a class="layout-topbar-logo flex items-center" [routerLink]="localizedRoute('dashboard')">
                    <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                            fill="#ffffff"
                        />
                    </svg>
                    <span class="text-white font-bold tracking-wide shrink-0 ml-2">modbases.com</span>

                    <!-- ✍️ Sabit genişlikli daktilo alanı -->
                    <span class="typed-container ml-3 hidden md:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg">
                        <span class="typed-text">{{ displayedText }}</span>
                        <span class="typed-cursor">|</span>
                    </span>
                </a>
            </div>

            <div class="layout-topbar-actions">
                <!-- Dil seçici -->
                <div class="language-switcher" aria-label="Dil seçimi">
                    <a [routerLink]="languageRoute('tr')" [class.active]="currentLanguage === 'tr'">TR</a>

                    <a [routerLink]="languageRoute('en')" [class.active]="currentLanguage === 'en'">EN</a>

                    <a [routerLink]="languageRoute('de')" [class.active]="currentLanguage === 'de'">DE</a>
                </div>
                <div class="layout-config-menu">
                    <button type="button" class="layout-topbar-action glass-btn" (click)="toggleDarkMode()">
                        <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                    </button>

                    <div class="relative">
                        <button
                            class="layout-topbar-action layout-topbar-action-highlight glass-btn"
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-scalein"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-fadeout"
                            [hideOnOutsideClick]="true"
                        >
                            <i class="pi pi-palette"></i>
                        </button>
                        <app-configurator />
                    </div>
                </div>

                <!-- 🔔 Aktif Odalar Bildirim Zili -->
                <div class="relative">
                    <button
                        class="layout-topbar-action glass-btn"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                        [attr.aria-label]="'topbar.activeRooms' | translate"
                        [title]="'topbar.activeRooms' | translate"
                    >
                        <i class="pi pi-bell"></i>
                        <span class="notif-badge" *ngIf="activeCount$ | async as c" [class.hidden]="!c">{{ c }}</span>
                    </button>

                    <div class="hidden topbar-popover w-80">
                        <div class="p-4 border-b border-rose-100">
                            <div class="font-bold text-rose-600 text-base">Aktif Odalar</div>
                        </div>

                        <div class="p-2">
                            <ng-container *ngIf="activeRooms$ | async as list; else noActive">
                                <a class="notif-item flex items-center gap-3 p-3 rounded-xl cursor-pointer" *ngFor="let r of list | slice: 0 : 6" [routerLink]="['/chat', r.id]">
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 text-rose-500">
                                        <i class="pi pi-comments text-lg"></i>
                                    </div>
                                    <div class="flex-1 truncate">
                                        <div class="text-sm font-bold text-gray-800 truncate">{{ r.subject }}</div>
                                        <div class="text-xs text-gray-500 truncate mt-0.5">
                                            {{ r.createdAt | date: 'dd/MM/yyyy HH:mm' }}
                                        </div>
                                    </div>
                                    <span
                                        class="text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                                        [ngClass]="{
                                            'bg-green-100 text-green-700': r.status === 'OPEN',
                                            'bg-blue-100 text-blue-700': r.status === 'ASSIGNED'
                                        }"
                                    >
                                        {{ r.status }}
                                    </span>
                                </a>

                                <div class="mt-3 mb-1 text-center text-xs font-semibold text-rose-400 cursor-pointer hover:text-rose-600 transition-colors" *ngIf="list.length > 6">Tümünü Gör (+ {{ list.length - 6 }} daha)</div>
                            </ng-container>

                            <ng-template #noActive>
                                <div class="text-sm text-gray-500 text-center p-4">Şu anda aktif oda bulunuyor.</div>
                            </ng-template>
                        </div>
                    </div>
                </div>

                <button
                    class="layout-topbar-menu-button layout-topbar-action glass-btn"
                    pStyleClass="@next"
                    enterFromClass="hidden"
                    enterActiveClass="animate-scalein"
                    leaveToClass="hidden"
                    leaveActiveClass="animate-fadeout"
                    [hideOnOutsideClick]="true"
                >
                    <i class="pi pi-ellipsis-v"></i>
                </button>

                <div class="layout-topbar-menu hidden lg:block">
                    <div class="layout-topbar-menu-content flex items-center bg-transparent shadow-none">
                        <!-- KULLANICI GİRİŞ YAPMIŞSA GÖSTERİLECEK ALAN -->
                        <ng-container *ngIf="username$ | async as username; else guestActions">
                            <div class="text-white text-sm mr-3 text-right">
                                <span class="opacity-80 text-xs">{{ 'topbar.welcome' | translate }}</span
                                ><br />
                                <strong class="text-base tracking-wide">{{ username }}</strong>
                            </div>
                            <button type="button" class="layout-topbar-action glass-btn" [title]="'topbar.logout' | translate" (click)="logout()">
                                <i class="pi pi-sign-out"></i>
                            </button>
                        </ng-container>

                        <!-- KULLANICI GİRİŞ YAPMAMIŞSA GÖSTERİLECEK BUTONLAR -->
                        <ng-template #guestActions>
                            <div class="flex items-center gap-2 ml-2">
                                <a routerLink="/auth/login" class="topbar-auth-btn glass-btn">
                                    <i class="pi pi-sign-in text-sm"></i>
                                    <span>{{ 'topbar.login' | translate }}</span>
                                </a>
                                <a routerLink="/auth/register" class="topbar-auth-btn register-highlight-btn">
                                    <i class="pi pi-user-plus text-sm"></i>
                                    <span>{{ 'topbar.register' | translate }}</span>
                                </a>
                            </div>
                        </ng-template>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .modern-red-topbar {
                background: linear-gradient(270deg, #ff416c, #ff4b2b, #ff758c, #ff5e62, #ff9966, #ff416c) !important;
                background-size: 600% 600% !important;
                animation: flowGradient 8s ease infinite !important;
                box-shadow: 0 4px 20px rgba(255, 65, 108, 0.4) !important;
                border-bottom: none !important;
            }

            @keyframes flowGradient {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }

            .typed-container {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.35);
                backdrop-filter: blur(4px);
                color: #ffffff;
                letter-spacing: 0.5px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                white-space: nowrap !important;
                min-width: 105px;
                display: inline-flex;
                justify-content: flex-start;
                overflow: hidden;
            }

            .typed-text {
                display: inline-block;
                white-space: nowrap;
            }

            .typed-cursor {
                font-weight: 300;
                margin-left: 2px;
                animation: blinkCursor 0.8s infinite;
            }

            @keyframes blinkCursor {
                0%,
                100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0;
                }
            }

            .modern-red-topbar .glass-btn {
                background-color: rgba(255, 255, 255, 0.15) !important;
                color: #ffffff !important;
                border-radius: 12px !important;
                border: 1px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(8px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .modern-red-topbar .glass-btn:hover {
                background-color: rgba(255, 255, 255, 0.3) !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            /* Giriş Yap / Kayıt Ol Buton Stilleri */
            /* Dil seçici */
            .language-switcher {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px;
                margin-right: 8px;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.25);
            }

            .language-switcher a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 34px;
                padding: 7px 9px;
                border-radius: 8px;
                color: #ffffff;
                text-decoration: none;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.2s ease;
            }

            .language-switcher a:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .language-switcher a.active {
                background: #ffffff;
                color: #ff416c;
            }
            .topbar-auth-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 8px 14px;
                border-radius: 12px;
                font-size: 13px;
                font-weight: 600;
                text-decoration: none;
                white-space: nowrap;
                transition: all 0.25s ease;
            }

            .register-highlight-btn {
                background-color: #ffffff !important;
                color: #ff416c !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            }

            .register-highlight-btn:hover {
                background-color: #fff0f3 !important;
                transform: translateY(-2px);
            }

            .notif-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                font-size: 11px;
                line-height: 1;
                padding: 4px 6px;
                background: #ffffff;
                color: #ff416c;
                border-radius: 999px;
                font-weight: 800;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }

            .topbar-popover {
                position: absolute;
                right: 0;
                top: 3.5rem;
                z-index: 1000;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(255, 65, 108, 0.15);
                border: 1px solid rgba(255, 65, 108, 0.1);
                overflow: hidden;
            }

            .notif-item {
                transition: all 0.2s ease;
            }

            .notif-item:hover {
                background-color: #fff0f3 !important;
                transform: translateX(4px);
            }

            :host-context(.layout-theme-dark) .topbar-popover {
                background: #1e1e1e;
                border-color: #333;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            }

            :host-context(.layout-theme-dark) .notif-item:hover {
                background-color: #2d2d2d !important;
            }

            :host-context(.layout-theme-dark) .text-gray-800 {
                color: #e0e0e0 !important;
            }
        `
    ]
})
export class AppTopbar implements OnInit, OnDestroy {
    // Dil değiştirirken mevcut sayfanın yolunu korur.
    languageRoute(language: 'tr' | 'en' | 'de'): string[] {
        const urlTree = this.router.parseUrl(this.router.url);

        const segments = urlTree.root.children['primary']?.segments.map((s) => s.path) ?? [];

        // Mevcut URL'de dil öneki varsa kaldır.
        if (segments[0] === 'en' || segments[0] === 'de') {
            segments.shift();
        }

        // Kök dizin Türkçe kalır.
        if (language === 'tr') {
            return ['/', ...segments];
        }

        return [`/${language}`, ...segments];
    }

    // Logo gibi bağlantılarda mevcut dili korur.
    localizedRoute(...segments: string[]): string[] {
        const language = this.currentLanguage;

        if (language === 'tr') {
            return ['/', ...segments];
        }

        return [`/${language}`, ...segments];
    }
    get currentLanguage(): 'tr' | 'en' | 'de' {
        const path = this.router.url.split(/[?#]/)[0];

        if (path === '/en' || path.startsWith('/en/')) {
            return 'en';
        }

        if (path === '/de' || path.startsWith('/de/')) {
            return 'de';
        }

        return 'tr';
    }
    username$!: Observable<string | null>;
    activeRooms$!: Observable<Room[]>;
    activeCount$!: Observable<number>;
    private isAdmin = false;

    displayedText: string = '';
    private get fullText(): string {
        return this.languageService.translate('topbar.tagline');
    }
    private charIndex: number = 0;
    private isDeleting: boolean = false;
    private typingInterval: any;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private rooms: RoomService,
        private router: Router,

        private languageService: LanguageService
    ) {}

    ngOnInit(): void {
        this.username$ = this.authService.getUsername();
        this.isAdmin = this.authService['hasRole']?.('ADMIN') ?? false;

        // Sohbet servisi sunucuda devrede olmadığı için geçici olarak kapatıldı.
        this.activeRooms$ = of([]);
        this.activeCount$ = of(0);

        this.startTypingEffect();
    }

    ngOnDestroy(): void {
        if (this.typingInterval) {
            clearTimeout(this.typingInterval);
        }
    }

    logout(): void {
        if (typeof (this.authService as any).logout === 'function') {
            (this.authService as any).logout();
        } else {
            localStorage.clear();
        }
        this.router.navigate(['/auth/login']);
    }

    private startTypingEffect() {
        const type = () => {
            if (!this.isDeleting) {
                this.displayedText = this.fullText.substring(0, this.charIndex + 1);
                this.charIndex++;

                if (this.charIndex === this.fullText.length) {
                    this.isDeleting = true;
                    this.typingInterval = setTimeout(type, 2000);
                    return;
                }
            } else {
                this.displayedText = this.fullText.substring(0, this.charIndex - 1);
                this.charIndex--;

                if (this.charIndex === 0) {
                    this.isDeleting = false;
                }
            }

            const speed = this.isDeleting ? 80 : 120;
            this.typingInterval = setTimeout(type, speed);
        };

        this.typingInterval = setTimeout(type, 500);
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { ModItem } from '../../services/mod.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
    template: `
        <div class="welcome-container">
            <!-- Üst Karşılama ve Arama Alanı (Yumuşak Pastel Gradyen) -->
            <div class="welcome-hero">
                <div class="hero-text">
                    <h1>{{ 'dashboard.heroTitle' | translate }}</h1>
                    <p>{{ 'dashboard.heroSubtitle' | translate }}</p>
                </div>
                <div class="hero-search">
                    <input type="search" [(ngModel)]="searchInput" (keyup.enter)="applySearch()" [placeholder]="'dashboard.searchPlaceholder' | translate" [attr.aria-label]="'dashboard.searchPlaceholder' | translate" />
                    <button type="button" (click)="applySearch()">
                        <i class="fa-solid fa-search"></i>
                        {{ 'dashboard.searchButton' | translate }}
                    </button>
                </div>
            </div>

            <!-- Hızlı İstatistikler / Özet Kartları -->
            <div class="stats-grid">
                <!-- 1. Video Kartı -->
                <div class="stat-card video-card">
                    <iframe src="https://www.youtube.com/embed/-_h9EvnFm4g?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&start=2300&end=3120" loading="lazy"></iframe>
                </div>
                <!-- 2. Video Kartı -->
                <div class="stat-card video-card">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/WBXvdFeMH70?si=9aXIzjAy0sgrKe1C&amp;autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&start=2400&end=3120" loading="lazy"></iframe>
                </div>

                <!-- 3. İstatistik Kartı -->
                <div class="stat-card info-card">
                    <div class="stat-icon app"><i class="fa-solid fa-gamepad"></i></div>
                    <div class="stat-info">
                        <h3>{{ mods.length }}</h3>
                        <p>{{ modsCountLabel }}</p>
                    </div>
                </div>
            </div>

            <!-- Veritabanından gelen modlar; artık eski/silinmiş link yok -->
            <div class="section-title">
                <h2>🔥 {{ modsSectionTitle }}</h2>
            </div>

            <div class="content-grid">
                <div class="media-card" *ngFor="let mod of visibleMods; trackBy: trackByModId">
                    <div class="card-img-wrap">
                        <a class="card-image-link" [routerLink]="localizedRoute(mod.category.slug, mod.slug)">
                            <img *ngIf="mod.thumbnailUrl; else imagePlaceholder" [src]="mod.thumbnailUrl" [alt]="mod.title" loading="lazy" decoding="async" />
                            <ng-template #imagePlaceholder>
                                <div class="image-placeholder"><i class="fa-solid fa-gamepad"></i></div>
                            </ng-template>
                        </a>
                        <span class="badge mod" *ngIf="mod.badgeText">{{ mod.badgeText }}</span>
                    </div>
                    <div class="card-details">
                        <h3>
                            <a [routerLink]="localizedRoute(mod.category.slug, mod.slug)">{{ mod.title }}</a>
                        </h3>
                        <p>{{ mod.shortDescription || mod.aboutDescription }}</p>
                        <a [routerLink]="localizedRoute(mod.category.slug, mod.slug)" class="btn-download-card">
                            {{ viewModLabel }}
                        </a>
                    </div>
                </div>

                <div class="media-card empty-card" *ngIf="isLoading">
                    <div class="card-details">
                        <h3>{{ loadingLabel }}</h3>
                    </div>
                </div>

                <div class="media-card empty-card" *ngIf="!isLoading && loadError">
                    <div class="card-details">
                        <h3>{{ errorLabel }}</h3>
                    </div>
                </div>

                <div class="media-card empty-card" *ngIf="!isLoading && !loadError && visibleMods.length === 0">
                    <div class="card-details">
                        <h3>{{ emptyTitle }}</h3>
                        <p>{{ emptyDescription }}</p>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .welcome-container {
                padding: 24px;
                background-color: #f8fafc;
                color: #334155;
                min-height: 100%;
            }

            /* CANLI AKTİVİTE BANDI STİLLERİ */
            .live-ticker-bar {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 10px 15px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
            }

            .ticker-badge {
                background: #f1f5f9;
                color: #0f172a;
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 8px;
                white-space: nowrap;
                border: 1px solid #e2e8f0;
            }

            /* Nabız (Pulse) Efekti */
            .pulse-dot {
                width: 8px;
                height: 8px;
                background-color: #10b981;
                border-radius: 50%;
                display: inline-block;
                box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
                }
                70% {
                    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
                }
            }

            .ticker-content {
                flex: 1;
                overflow: hidden;
                font-size: 13px;
                color: #64748b;
                font-weight: 500;
            }

            /* Kart Üstü Canlı Rozet */
            .live-badge {
                position: absolute;
                bottom: 8px;
                left: 8px;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(4px);
                color: #fff;
                padding: 3px 8px;
                font-size: 10px;
                font-weight: 600;
                border-radius: 4px;
            }

            /* Pastel Gradyen Hero Alanı */
            .welcome-hero {
                background: linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%);
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 35px;
                margin-bottom: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
            }

            .hero-text h1 {
                font-size: 26px;
                color: #0f172a;
                margin-bottom: 8px;
                font-weight: 700;
            }

            .hero-text p {
                font-size: 15px;
                color: #64748b;
            }

            .hero-search {
                display: flex;
                background: #ffffff;
                border: 1px solid #cbd5e1;
                border-radius: 10px;
                overflow: hidden;
                width: 100%;
                max-width: 420px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
            }

            .hero-search input {
                flex: 1;
                background: transparent;
                border: none;
                padding: 12px 16px;
                color: #1e293b;
                outline: none;
                font-size: 14px;
            }

            .hero-search input::placeholder {
                color: #94a3b8;
            }

            .hero-search button {
                background: linear-gradient(135deg, #0ea5e9, #0284c7);
                border: none;
                color: #fff;
                padding: 0 22px;
                cursor: pointer;
                font-weight: 600;
                transition: opacity 0.2s;
            }

            .hero-search button:hover {
                opacity: 0.9;
            }

            /* İstatistik Kartları */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .stat-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
            }

            .stat-icon {
                width: 48px;
                height: 48px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: #fff;
            }

            .stat-icon.mod {
                background: linear-gradient(135deg, #10b981, #059669);
            }

            .stat-icon.yama {
                background: linear-gradient(135deg, #f59e0b, #d97706);
            }

            .stat-icon.app {
                background: linear-gradient(135deg, #0af468, #2563eb);
            }

            .stat-info h3 {
                font-size: 20px;
                color: #0f172a;
                margin-bottom: 2px;
                font-weight: 700;
            }

            .stat-info p {
                font-size: 13px;
                color: #64748b;
            }

            .section-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 18px;
            }

            .section-title h2 {
                font-size: 18px;
                color: #0f172a;
                font-weight: 700;
            }

            .see-all {
                font-size: 14px;
                color: #0284c7;
                text-decoration: none;
                font-weight: 600;
            }

            .see-all:hover {
                text-decoration: underline;
            }

            /* İçerik Kartları */
            .content-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
                gap: 22px;
            }

            .media-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                transition:
                    transform 0.2s ease,
                    box-shadow 0.2s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
            }

            .media-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                border-color: #cbd5e1;
            }

            .card-img-wrap {
                position: relative;
                height: 150px;
            }

            .card-img-wrap img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .badge {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 4px 10px;
                font-size: 11px;
                font-weight: 600;
                border-radius: 6px;
                color: #fff;
            }

            /* Ana kartımız - Dışarı taşan her şeyi jilet gibi keser */
            .video-card {
                position: relative;
                overflow: hidden !important; /* Dışarı taşan UI elemanlarını kesinlikle gizler */
                border-radius: 12px;
                min-height: 200px;
                padding: 0;
            }

            /* Videonun kendisi - Kartın çok ötesine taşıp arayüzü saklar */
            .video-card iframe {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 250%; /* Kartın 2.5 katı genişlik */
                height: 250%; /* Kartın 2.5 katı yükseklik */
                transform: translate(-50%, -50%); /* Videonun tam ortasını kartın ortasına odaklar */
                pointer-events: none; /* Fareyle üzerine gelinmesini/tıklanmasını tamamen engeller */
                border: none;
            }

            .badge.mod {
                background: rgba(16, 185, 129, 0.9);
                backdrop-filter: blur(4px);
            }

            .badge.yama {
                background: rgba(245, 158, 11, 0.9);
                backdrop-filter: blur(4px);
            }

            .card-details {
                padding: 18px;
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            .meta-row {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: #64748b;
                margin-bottom: 10px;
                font-weight: 500;
            }

            .card-details h3 {
                font-size: 15px;
                color: #0f172a;
                margin-bottom: 8px;
                font-weight: 600;
            }

            .card-details p {
                font-size: 13px;
                color: #64748b;
                margin-bottom: 16px;
                flex: 1;
                line-height: 1.5;
            }

            .btn-download-card {
                background: #f1f5f9;
                color: #334155;
                border: 1px solid #e2e8f0;
                padding: 9px;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                text-align: center;
            }

            .btn-download-card:hover {
                background: #0284c7;
                color: #fff;
                border-color: #0284c7;
            }

            .card-image-link {
                display: block;
                height: 100%;
            }

            .card-details h3 a {
                color: inherit;
                text-decoration: none;
            }

            .card-details h3 a:hover {
                color: #0284c7;
            }

            .image-placeholder {
                display: flex;
                height: 100%;
                align-items: center;
                justify-content: center;
                background: #f1f5f9;
                color: #94a3b8;
                font-size: 32px;
            }

            .empty-card {
                grid-column: 1 / -1;
            }

            .text-yellow {
                color: #eab308;
            }

            .text-green {
                color: #10b981;
            }
        </style>
    `
})
export class Dashboard implements OnInit, OnDestroy {
    mods: ModItem[] = [];
    searchInput = '';
    searchTerm = '';
    isLoading = true;
    loadError = false;

    private currentLanguage = '';
    private readonly destroy$ = new Subject<void>();

    constructor(
        private languageService: LanguageService,
        private seoService: SeoService,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currentLanguage = this.languageService.currentLanguage;
        this.updatePageSeo();
        this.loadMods();

        // Angular, aynı dashboard bileşenini dil değişiminde yeniden kullanabilir.
        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                const language = this.languageService.currentLanguage;
                if (language !== this.currentLanguage) {
                    this.currentLanguage = language;
                    this.searchInput = '';
                    this.searchTerm = '';
                    this.updatePageSeo();
                    this.loadMods();
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadMods(): void {
        const requestedLanguage = this.languageService.currentLanguage;
        this.isLoading = true;
        this.loadError = false;
        this.mods = [];

        // Backend: GET /api/mods?lang=tr|en|de
        this.http
            .get<ModItem[]>('/api/mods', {
                params: { lang: requestedLanguage }
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    if (requestedLanguage !== this.languageService.currentLanguage) return;
                    // Kategorisi olmayan modlara bozuk URL üretme.
                    this.mods = (data ?? []).filter((mod) => !!mod.category?.slug && !!mod.slug).sort((a, b) => b.id - a.id);
                    this.isLoading = false;
                },
                error: (error) => {
                    if (requestedLanguage !== this.languageService.currentLanguage) return;
                    console.error('Modlar yüklenemedi:', error);
                    this.mods = [];
                    this.isLoading = false;
                    this.loadError = true;
                }
            });
    }

    applySearch(): void {
        this.searchTerm = this.searchInput.trim().toLocaleLowerCase();
    }

    get visibleMods(): ModItem[] {
        if (!this.searchTerm) return this.mods.slice(0, 12);

        return this.mods.filter((mod) => [mod.title, mod.shortDescription, mod.category?.name].some((value) => (value || '').toLocaleLowerCase().includes(this.searchTerm))).slice(0, 12);
    }

    trackByModId(_index: number, mod: ModItem): number {
        return mod.id;
    }

    private get labels() {
        const copy = {
            tr: {
                section: 'Son Eklenen Modlar',
                count: 'Yayınlanan Mod',
                view: 'Modu İncele',
                loading: 'Modlar yükleniyor...',
                error: 'Modlar yüklenemedi. Daha sonra tekrar deneyin.',
                empty: 'Henüz mod eklenmedi',
                emptyDescription: 'Yeni modlar yayınlandığında burada görünecek.',
                noResults: 'Aramanızla eşleşen mod bulunamadı',
                noResultsDescription: 'Başka bir kelimeyle tekrar arayın.'
            },
            en: {
                section: 'Recently Added Mods',
                count: 'Published Mods',
                view: 'View Mod',
                loading: 'Loading mods...',
                error: 'Could not load mods. Please try again later.',
                empty: 'No mods published yet',
                emptyDescription: 'New mods will appear here when published.',
                noResults: 'No matching mods found',
                noResultsDescription: 'Try searching with another keyword.'
            },
            de: {
                section: 'Neu hinzugefügte Mods',
                count: 'Veröffentlichte Mods',
                view: 'Mod ansehen',
                loading: 'Mods werden geladen...',
                error: 'Mods konnten nicht geladen werden. Bitte später erneut versuchen.',
                empty: 'Noch keine Mods veröffentlicht',
                emptyDescription: 'Neue Mods werden hier angezeigt, sobald sie veröffentlicht sind.',
                noResults: 'Keine passenden Mods gefunden',
                noResultsDescription: 'Versuche es mit einem anderen Suchbegriff.'
            }
        };
        return copy[this.languageService.currentLanguage];
    }

    get modsSectionTitle(): string {
        return this.labels.section;
    }
    get modsCountLabel(): string {
        return this.labels.count;
    }
    get viewModLabel(): string {
        return this.labels.view;
    }
    get loadingLabel(): string {
        return this.labels.loading;
    }
    get errorLabel(): string {
        return this.labels.error;
    }
    get emptyTitle(): string {
        return this.searchTerm ? this.labels.noResults : this.labels.empty;
    }
    get emptyDescription(): string {
        return this.searchTerm ? this.labels.noResultsDescription : this.labels.emptyDescription;
    }

    private updatePageSeo(): void {
        const lang = this.languageService.currentLanguage;

        const seoContent = {
            tr: {
                title: 'Oyun Modları ve Türkçe Yamalar İndir',
                description: 'ModBases ile oyun modlarını, Türkçe yamaları ve oyun eklentilerini keşfedin. Güncel içerikleri, kurulum bilgilerini ve indirme bağlantılarını inceleyin.'
            },
            en: {
                title: 'Download Game Mods, Patches & Add-ons',
                description: 'Discover game mods, patches and add-ons on ModBases. Explore downloads, installation guides and the latest content for your favorite games.'
            },
            de: {
                title: 'Spiele Mods, Patches und Erweiterungen herunterladen',
                description: 'Entdecke Spiele-Mods, Patches und Erweiterungen auf ModBases. Finde Downloads, Installationsanleitungen und neue Inhalte für deine Lieblingsspiele.'
            }
        };

        const seo = seoContent[lang];

        this.seoService.updateSeo(seo.title, seo.description, {
            tr: '/',
            en: '/en',
            de: '/de'
        });
    }

    localizedRoute(...segments: string[]): string[] {
        return this.languageService.localizedRoute(...segments);
    }
}

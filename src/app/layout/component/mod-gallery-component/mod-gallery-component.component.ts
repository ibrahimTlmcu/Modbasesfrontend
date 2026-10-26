import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category, ModItem, ModService } from '../../../services/mod.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-mod-gallery',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslatePipe],
    template: `
        <div class="mod-container">
            <!-- Kategori Yükleniyor veya Bulunamadı Durumu -->
            <div *ngIf="!category && !errorMessage" style="text-align: center; padding: 2rem;">
                <p>{{ 'gallery.loadingCategory' | translate }}</p>
            </div>

            <div *ngIf="errorMessage" style="text-align: center; padding: 2rem; color: #d9534f;">
                <h3>{{ errorMessage }}</h3>
            </div>

            <!-- Kategori Geldiyse Göster -->
            <ng-container *ngIf="category">
                <header class="mod-header">
                    <h1>{{ category.headerTitle || category.name }}</h1>
                    <p>{{ category.description }}</p>
                </header>

                <!-- Mod Listesi Boşsa Uyarı Göster -->
                <div *ngIf="mods.length === 0" style="text-align: center; color: #777; padding: 2rem;">

                    <p>{{'gallery.nomods' | translate}}</p>
                </div>

                <!-- Mod Kartları -->
                <div class="mod-grid" *ngIf="mods.length > 0">
                    <div class="mod-card" *ngFor="let mod of mods">
                        <img [src]="mod.thumbnailUrl" [alt]="mod.title" class="mod-image" />
                        <div class="mod-content">
                            <h3>{{ mod.title }}</h3>
                            <p>{{ mod.shortDescription }}</p>
                            <button class="btn-indir" [routerLink]="localizedLink(category.slug, mod.slug)">
                                {{ 'gallery.viewMod' | translate }}
                            </button>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
    styles: `
        .mod-container {
            padding: 2rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
        }
        .mod-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .mod-header h1 {
            color: #333;
        }
        .mod-header p {
            color: #666;
            font-size: 1.1rem;
        }
        .mod-grid {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        .mod-card {
            flex: 1;
            min-width: 300px;
            max-width: 320px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s;
            background: #fff;
        }
        .mod-card:hover {
            transform: translateY(-5px);
        }
        .mod-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-bottom: 1px solid #e0e0e0;
            display: block;
        }
        .mod-content {
            padding: 1.5rem;
        }
        .mod-content h3 {
            margin-top: 0;
            color: #2c3e50;
        }
        .mod-content p {
            color: #555;
            line-height: 1.5;
        }
        .btn-indir {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
        }
        .btn-indir:hover {
            background-color: #0056b3;
        }
    `
})
export class ModGalleryComponent implements OnInit {
    category: Category | null = null;
    mods: ModItem[] = [];
    errorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private modService: ModService,
        private cdr: ChangeDetectorRef,
        private languageService: LanguageService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            // app.routes.ts içinde parametre adı 'categorySlug', 'slug' veya 'id' olabilir, hepsini kontrol eder:
            const slug = params.get('categorySlug') || params.get('slug') || params.get('id');
            console.log('Route üzerinden yakalanan kategori parametresi:', slug);

            if (slug) {
                this.loadCategoryData(slug);
            } else {
                // Eğer URL /ets2 gibi sabit bir route olarak tanımlandıysa doğrudan URL yolundan al:
                const currentPath = this.route.snapshot.url[0]?.path;
                console.log('Parametre bulunamadı, URL yolu kullanılıyor:', currentPath);
                if (currentPath) {
                    this.loadCategoryData(currentPath);
                }
            }
        });
    }
    localizedLink(...segments: string[]): string[] {
        return this.languageService.localizedRoute(...segments);
    }

    loadCategoryData(slug: string) {
        this.errorMessage = '';

        this.modService.getCategoryBySlug(slug).subscribe({
            next: (cat) => {
                console.log('Backend Kategori Yanıtı:', cat);
                this.category = cat;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Kategori çekilirken hata oluştu:', err);
                this.errorMessage = `"${slug}" ${this.languageService.translate('gallery.categoryNotFound')} (HTTP ${err.status}).`;
                this.cdr.detectChanges();
            }
        });

        this.modService.getModsByCategory(slug).subscribe({
            next: (mods) => {
                console.log('Backend Mod Listesi Yanıtı:', mods);
                this.mods = mods;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Modlar çekilirken hata oluştu:', err);
                this.cdr.detectChanges();
            }
        });
    }
}

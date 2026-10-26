import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // 1. Router eklendi

@Component({
    selector: 'app-admin-panel',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
    private apiUrl = '/api';

    activeTab: 'mod' | 'category' = 'mod';
    categories: any[] = [];
    selectedCategoryId: number | null = null;

    newCategory = {
        mainGroup: 'Oyunlar',
        name: '',
        slug: '',
        headerTitle: '',
        description: '',
        backLinkText: '← Mod Galerisine Dön',
        aboutTitle: 'Mod Hakkında'
    };

    newMod = {
        title: '',
        slug: '',
        thumbnailUrl: '',
        shortDescription: '',
        badgeText: 'Sürüm: v1.0',
        gallery: [
            { imageUrl: '', altText: '1. Görsel Açıklaması' },
            { imageUrl: '', altText: '2. Görsel Açıklaması' },
            { imageUrl: '', altText: '3. Görsel Açıklaması' },
            { imageUrl: '', altText: '4. Görsel Açıklaması' }
        ],
        aboutDescription: '',
        features: [''],
        downloadUrl: '',
        downloadBtnText: '⬇️ Modu İndir (.zip)',
        installNote: '',
        videoSectionTitle: 'Mod Oynanış ve Tanıtım Videosu',
        videoDescription: '',
        youtubeEmbedUrl: '',
        iframeTitle: 'Gameplay Video'
    };

    // 2. Constructor'a Router enjekte edildi
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadCategories();
    }
    // Kategorileri Backend'den çek
    loadCategories(): void {
        this.http.get<any[]>(`${this.apiUrl}/categories?lang=tr`).subscribe({
            next: (data) => {
                this.categories = data;

                if (this.categories.length > 0 && !this.categories.some((c) => c.id === this.selectedCategoryId)) {
                    this.selectedCategoryId = this.categories[0].id;
                }
            },
            error: (err) => console.error('Kategoriler yüklenemedi:', err)
        });
    }

    // Türkçe karakter uyumlu otomatik Slug (URL) oluşturucu
    generateSlug(text: string): string {
        const trMap: { [key: string]: string } = {
            ç: 'c',
            ğ: 'g',
            ı: 'i',
            ö: 'o',
            ş: 's',
            ü: 'u',
            Ç: 'c',
            Ğ: 'g',
            İ: 'i',
            Ö: 'o',
            Ş: 's',
            Ü: 'u'
        };
        return text
            .split('')
            .map((char) => trMap[char] || char)
            .join('')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    }

    onCategoryNameChange(): void {
        this.newCategory.slug = this.generateSlug(this.newCategory.name);
        if (!this.newCategory.headerTitle) {
            this.newCategory.headerTitle = `${this.newCategory.name} Galerisi`;
        }
    }

    onModTitleChange(): void {
        this.newMod.slug = this.generateSlug(this.newMod.title);
    }

    // Özellik (li) ekleme ve silme fonksiyonları
    addFeature(): void {
        this.newMod.features.push('');
    }

    removeFeature(index: number): void {
        if (this.newMod.features.length > 1) {
            this.newMod.features.splice(index, 1);
        }
    }

    // ngFor içinde input focus kaybını önlemek için
    trackByIndex(index: number): number {
        return index;
    }
    saveCategory(): void {
        const payload = {
            translations: [
                {
                    languageCode: 'tr',
                    ...this.newCategory
                }
            ]
        };

        this.http.post<any>(`${this.apiUrl}/categories?lang=tr`, payload).subscribe({
            next: (res) => {
                alert('Kategori 3 dilde başarıyla eklendi!');
                this.loadCategories();
                this.selectedCategoryId = res.id;
                this.activeTab = 'mod';
            },
            error: (err) => {
                console.error('Kategori ekleme hatası:', err);
                alert(err.error?.message || 'Kategori eklenirken hata oluştu!');
            }
        });
    }

    // MOD / PROGRAM KAYDET (POST)
    saveMod(): void {
        if (!this.selectedCategoryId) {
            alert('Lütfen önce bir kategori seçin!');
            return;
        }

        const payload = {
            categoryId: this.selectedCategoryId,
            thumbnailUrl: this.newMod.thumbnailUrl,
            translations: [
                {
                    languageCode: 'tr',
                    ...this.newMod,
                    features: this.newMod.features.filter((f) => f.trim() !== ''),
                    gallery: this.newMod.gallery.filter((img) => img.imageUrl.trim() !== '')
                }
            ]
        };

        this.http.post(`${this.apiUrl}/categories/${this.selectedCategoryId}/mods?lang=tr`, payload).subscribe({
            next: () => {
                alert('Mod 3 dilde başarıyla yayınlandı!');
                this.resetModForm();
            },
            error: (err) => {
                console.error('Mod ekleme hatası:', err);
                alert(err.error?.message || 'Mod kaydedilirken hata oluştu!');
            }
        });
    }

    resetModForm(): void {
        this.newMod.title = '';
        this.newMod.slug = '';
        this.newMod.thumbnailUrl = '';
        this.newMod.shortDescription = '';
        this.newMod.aboutDescription = '';
        this.newMod.features = [''];
        this.newMod.gallery = [
            { imageUrl: '', altText: '1. Görsel Açıklaması' },
            { imageUrl: '', altText: '2. Görsel Açıklaması' },
            { imageUrl: '', altText: '3. Görsel Açıklaması' },
            { imageUrl: '', altText: '4. Görsel Açıklaması' }
        ];
    }
}

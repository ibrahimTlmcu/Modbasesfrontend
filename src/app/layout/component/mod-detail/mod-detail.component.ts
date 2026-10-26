import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModService, ModItem } from '../../../services/mod.service';
import { CommentService } from '../../../services/comment.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { LanguageService } from '../../../services/language.service';
import { LocalizedString } from '@angular/compiler';
import { SeoService } from '../../../services/seo.service';
import { Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-mod-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
    templateUrl: './mod-detail.component.html',
    styleUrls: ['./mod-detail.component.scss']
})
export class ModDetailComponent implements OnInit {
    mod?: ModItem;
    safeYoutubeUrl?: SafeResourceUrl;

    // Yorumlar için değişkenler
    comments: any[] = [];
    newCommentText: string = '';
    userName: string = '';
    userEmail: string = '';

    // Sağ taraftaki son eklenen modlar için değişkenler
    latestMods: ModItem[] = [];
    categorySlug: string = '';

    constructor(
        private route: ActivatedRoute,
        private modService: ModService,
        private commentService: CommentService,
        private sanitizer: DomSanitizer,
        private languageService: LanguageService,


        private seoService: SeoService,
        private meta: Meta,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const catSlug = params.get('categorySlug');
            const modSlug = params.get('modSlug');

            if (catSlug && modSlug) {
                this.categorySlug = catSlug;
                this.mod = undefined;
                this.safeYoutubeUrl = undefined;

                this.modService.getModDetail(catSlug, modSlug).subscribe({
                    next: (data: ModItem) => {
                        this.mod = data;

                        // SEO: Mod bilgilerine göre otomatik güncelle
                        this.updateModSeo(data);

                        if (data.youtubeEmbedUrl) {
                            this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.youtubeEmbedUrl);
                        }

                        if (data.id) {
                            this.loadComments(data.id);
                        }
                    },
                    error: (err) => {
                        console.error('Mod detayı yüklenemedi:', err);
                    }
                });

                this.loadCategoryMods(catSlug, modSlug);
            }
        });
    }

    private updateModSeo(mod: ModItem): void {
        const lang = this.languageService.currentLanguage;

        const suffix: Record<string, string> = {
            tr: 'İndir',
            en: 'Download',
            de: 'Herunterladen'
        };

        const title = `${mod.title} ${suffix[lang] || 'Download'}`;

        const description = mod.shortDescription?.trim() || mod.aboutDescription?.trim() || mod.title;

        this.http.get<Record<string, string>>(`/api/seo/mod/${mod.id}/alternates`).subscribe({
            next: (alternates) => {
                this.seoService.updateSeo(title, description, {
                    tr: new URL(alternates['tr']).pathname,
                    en: new URL(alternates['en']).pathname,
                    de: new URL(alternates['de']).pathname
                });
            },
            error: (err) => {
                console.error('Mod hreflang yüklenemedi:', err);
            }
        });

        // Mod görseli varsa Open Graph görseli
        if (mod.thumbnailUrl) {
            const imageUrl = new URL(mod.thumbnailUrl, 'https://www.modbases.com').href;

            this.meta.updateTag({
                property: 'og:image',
                content: imageUrl
            });

            this.meta.updateTag({
                name: 'twitter:image',
                content: imageUrl
            });
        } else {
            this.meta.removeTag("property='og:image'");
            this.meta.removeTag("name='twitter:image'");
        }
    }

    localizedRoute(...segments: string[]): string[] {
        return this.languageService.localizedRoute(...segments);
    }

    // Yorumları backend'den getir
    loadComments(modId: number) {
        this.commentService.getComments(modId).subscribe({
            next: (data) => {
                this.comments = data;
            },
            error: (err) => {
                console.error('Yorumlar yüklenirken hata oluştu:', err);
            }
        });
    }

    // Aynı kategorideki modları çekip sağ sidebar için filtrele
    loadCategoryMods(catSlug: string, currentModSlug: string) {
        this.modService.getModsByCategory(catSlug).subscribe({
            next: (mods: ModItem[]) => {
                // Okunan mevcut modu listeden çıkarıp ilk 3 tanesini alıyoruz
                this.latestMods = mods.filter((m: any) => m.slug !== currentModSlug).slice(0, 3);
            },
            error: (err) => {
                console.error('Kategori modları yüklenirken hata oluştu:', err);
            }
        });
    }

    // Biçimlendirme araç çubuğu (Kalın, İtalik, Spoiler vb.)
    formatText(tag: string) {
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let replacement = '';

        switch (tag) {
            case 'bold':
                replacement = `**${selectedText}**`;
                break;
            case 'italic':
                replacement = `*${selectedText}*`;
                break;
            case 'underline':
                replacement = `<u>${selectedText}</u>`;
                break;
            case 'strike':
                replacement = `<s>${selectedText}</s>`;
                break;
            case 'code':
                replacement = `\`${selectedText}\``;
                break;
            case 'link':
                replacement = `[${selectedText || 'link'}]()`;
                break;
            case 'spoiler':
                replacement = `[spoiler]${selectedText}[/spoiler]`;
                break;
        }

        this.newCommentText = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    }

    // Yeni yorumu veritabanına kaydet
    submitComment() {
        if (!this.newCommentText.trim() || !this.userName.trim()) {
            alert(this.languageService.translate('detail.commentRequired'));
            return;
        }

        const payload = {
            modId: this.mod?.id,
            userName: this.userName,
            userEmail: this.userEmail,
            text: this.newCommentText
        };

        this.commentService.addComment(payload).subscribe({
            next: (response) => {
                this.comments.unshift(response); // Yeni yorumu listenin başına ekle
                this.newCommentText = ''; // Metin kutusunu sıfırla
            },
            error: (err) => {
                console.error('Yorum gönderilemedi:', err);
                alert(this.languageService.translate('detail.commentSaveError'));
            }
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModService, ModItem } from '../../../services/mod.service';
import { CommentService } from '../../../services/comment.service';

@Component({
    selector: 'app-mod-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
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
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const catSlug = params.get('categorySlug');
            const modSlug = params.get('modSlug');

            if (catSlug && modSlug) {
                this.categorySlug = catSlug;

                // Mod detayını getir
                this.modService.getModDetail(catSlug, modSlug).subscribe((data: any) => {
                    this.mod = data;
                    if (data.youtubeEmbedUrl) {
                        this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.youtubeEmbedUrl);
                    }

                    // Mod verisi geldikten sonra o moda ait yorumları veritabanından çekiyoruz
                    if (data && data.id) {
                        this.loadComments(data.id);
                    }
                });

                // Aynı kategorideki diğer modları getir ve sağ sidebar'a doldur
                this.loadCategoryMods(catSlug, modSlug);
            }
        });
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
            alert('Lütfen kullanıcı adı ve yorum alanını doldurun.');
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
                alert('Yorum kaydedilirken bir hata oluştu.');
            }
        });
    }
}

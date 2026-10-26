import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export type SeoLanguage = 'tr' | 'en' | 'de';
export type SeoAlternatives = Partial<Record<SeoLanguage, string>>;

export interface SeoOptions {
    canonicalPath?: string;
    language?: SeoLanguage;
    imageUrl?: string;
    type?: 'website' | 'article';
    indexable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
    private readonly baseUrl = 'https://www.modbases.com';

    constructor(
        private readonly titleService: Title,
        private readonly meta: Meta,
        private readonly router: Router,
        @Inject(DOCUMENT) private readonly document: Document
    ) {}

    // Eski updateSeo(title, description, alternatives) çağrıları da çalışmaya devam eder.
    updateSeo(title: string, description: string, alternatives?: SeoAlternatives, options: SeoOptions = {}): void {
        const routePath = this.router.url.split(/[?#]/)[0] || '/';
        const path = options.canonicalPath ?? routePath;
        const canonicalPath = path === '/dashboard' ? '/' : path;
        const canonicalUrl = this.absoluteUrl(canonicalPath);
        const fullTitle = title.includes('ModBases') ? title : `${title} | ModBases`;
        const language = options.language ?? this.languageFromPath(routePath);
        const ogLocale: Record<SeoLanguage, string> = {
            tr: 'tr_TR',
            en: 'en_US',
            de: 'de_DE'
        };

        this.document.documentElement.lang = language;
        this.titleService.setTitle(fullTitle);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: fullTitle });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
        this.meta.updateTag({ property: 'og:type', content: options.type ?? 'website' });
        this.meta.updateTag({ property: 'og:site_name', content: 'ModBases' });
        this.meta.updateTag({ property: 'og:locale', content: ogLocale[language] });
        this.meta.updateTag({ name: 'twitter:card', content: options.imageUrl ? 'summary_large_image' : 'summary' });
        this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
        this.meta.updateTag({ name: 'twitter:description', content: description });

        if (options.imageUrl) {
            const imageUrl = options.imageUrl.startsWith('http') ? options.imageUrl : this.absoluteUrl(options.imageUrl);
            this.meta.updateTag({ property: 'og:image', content: imageUrl });
            this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
        } else {
            this.meta.removeTag("property='og:image'");
            this.meta.removeTag("name='twitter:image'");
        }

        if (options.indexable === false) {
            this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
        } else {
            // Özel sayfadan geri dönüldüğünde eski noindex etiketini temizle.
            this.meta.removeTag("name='robots'");
        }

        this.setLink('canonical', canonicalUrl);
        this.document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());

        if (alternatives) {
            const languages: SeoLanguage[] = ['tr', 'en', 'de'];
            for (const lang of languages) {
                const translatedPath = alternatives[lang];
                if (translatedPath) {
                    this.setAlternate(lang, this.absoluteUrl(translatedPath));
                }
            }
            // Varsayılan dil Türkçe; alternatifin gerçekten mevcut olması gerekir.
            if (alternatives.tr) {
                this.setAlternate('x-default', this.absoluteUrl(alternatives.tr));
            }
        }
    }

    private languageFromPath(path: string): SeoLanguage {
        return path === '/en' || path.startsWith('/en/') ? 'en' : path === '/de' || path.startsWith('/de/') ? 'de' : 'tr';
    }

    private absoluteUrl(path: string): string {
        if (/^https?:\/\//i.test(path)) return path;
        const prefixed = path.startsWith('/') ? path : `/${path}`;
        const clean = prefixed === '/' ? '/' : prefixed.replace(/\/+$/, '');
        return `${this.baseUrl}${clean}`;
    }

    private setLink(rel: string, href: string): void {
        let element = this.document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
        if (!element) {
            element = this.document.createElement('link');
            element.rel = rel;
            this.document.head.appendChild(element);
        }
        element.href = href;
    }

    private setAlternate(language: string, href: string): void {
        const element = this.document.createElement('link');
        element.rel = 'alternate';
        element.hreflang = language;
        element.href = href;
        this.document.head.appendChild(element);
    }
}

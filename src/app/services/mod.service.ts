import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LanguageService } from './language.service';
import { HttpClient, HttpParams } from '@angular/common/http';
export interface Category {
    id: number;
    mainGroup: string;
    name: string;
    slug: string;
    headerTitle: string;
    description: string;
    backLinkText: string;
    aboutTitle: string;
}

export interface GalleryImage {
    imageUrl: string;
    altText: string;
}

export interface ModItem {
    id: number;
    title: string;
    slug: string;
    thumbnailUrl: string;
    shortDescription: string;
    badgeText: string;
    gallery: GalleryImage[];
    aboutDescription: string;
    features: string[];
    downloadUrl: string;
    downloadBtnText: string;
    installNote: string;
    videoSectionTitle: string;
    videoDescription: string;
    youtubeEmbedUrl: string;
    iframeTitle: string;
    category: Category;
}

@Injectable({
    providedIn: 'root'
})
export class ModService {
    private apiUrl = '/api';
    constructor(
        private http: HttpClient,
        private languageService: LanguageService
    ) {}

    private getLangParams(): HttpParams {
        return new HttpParams().set('lang', this.languageService.currentLanguage);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/categories`, { params: this.getLangParams() });
    }

    getCategoryBySlug(slug: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/categories/${slug}`, { params: this.getLangParams() });
    }

    getModsByCategory(categorySlug: string): Observable<ModItem[]> {
        return this.http.get<ModItem[]>(`${this.apiUrl}/categories/${categorySlug}/mods`, { params: this.getLangParams() });
    }

    getModDetail(categorySlug: string, modSlug: string): Observable<ModItem> {
        return this.http.get<ModItem>(`${this.apiUrl}/mods/${categorySlug}/${modSlug}`, { params: this.getLangParams() });
    }
}

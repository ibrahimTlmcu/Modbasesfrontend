import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/categories`);
    }

    getCategoryBySlug(slug: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/categories/${slug}`);
    }

    getModsByCategory(categorySlug: string): Observable<ModItem[]> {
        return this.http.get<ModItem[]>(`${this.apiUrl}/categories/${categorySlug}/mods`);
    }

    getModDetail(categorySlug: string, modSlug: string): Observable<ModItem> {
        return this.http.get<ModItem>(`${this.apiUrl}/mods/${categorySlug}/${modSlug}`);
    }
}

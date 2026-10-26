import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppLanguage, TRANSLATIONS } from '../i18n/translation';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    constructor(private router: Router) {}

    get currentLanguage(): AppLanguage {
        const path = this.router.url.split(/[?#]/)[0];

        if (path === '/en' || path.startsWith('/en/')) {
            return 'en';
        }

        if (path === '/de' || path.startsWith('/de/')) {
            return 'de';
        }

        return 'tr';
    }
    localizedRoute(...segments: string[]): string[] {
        const language = this.currentLanguage;

        if (language === 'tr') {
            return ['/', ...segments];
        }

        return [`/${language}`, ...segments];
    }
    translate(key: string): string {
        const language = this.currentLanguage;

        return TRANSLATIONS[language][key] ?? TRANSLATIONS.tr[key] ?? key;
    }
}

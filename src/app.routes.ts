import { inject } from '@angular/core';
import { Routes, CanActivateFn, Router } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Register } from './app/pages/auth/Register';

import { KategoriEkleComponent } from './app/kategori-ekle/kategori-ekle.component';
import { KategoriGetirComponent } from './app/kategori-getir/kategori-getir.component';
import { KategoriGuncelleComponent } from './app/kategori-guncelle/kategori-guncelle.component';

import KullaniciProfilComponent from './app/kullanici-profil/kullanici-profil.component';
import { NewRequestComponent } from './app/new-request/new-request.component';
import { SssEkleComponent } from './app/sss-ekle/sss-ekle.component';
import { SssGuncelleComponent } from './app/sss-guncelle/sss-guncelle.component';
import { SssGetirComponent } from './app/sss-getir/sss-getir.component';
import { MyRoomsComponent } from './app/my-rooms/my-rooms.component';
import { AdminPanelComponent } from './app/admin-panel/admin-panel.component';

import { ModGalleryComponent } from './app/layout/component/mod-gallery-component/mod-gallery-component.component';
import { ModDetailComponent } from './app/layout/component/mod-detail/mod-detail.component';
import { GizlilikPolitikasiComponent } from 'app/pages/gizlilik-politikasi/gizlilik-politikasi.component';
import { IletisimComponent } from './app/pages/iletisim/iletisim.component';
import { KullanimKosullariComponent } from './app/pages/kullanim-kosullari/kullanim-kosullari.component';

// --- ADMIN YETKİ KONTROLÜ (GUARD) ---
// JWT Token içerisindeki bilgileri (payload) çözen yardımcı fonksiyon
function parseJwt(token: string): any {
    try {
        const base64Url = token.split('.')[1];
        // İngilizce ve Almanca sürümlerin herkese açık sayfaları.
        // Mevcut Türkçe rotalarına dokunmaz.

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

// --- ADMIN YETKİ KONTROLÜ (GUARD) ---
export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);

    // 1. currentUser varsa oradan oku, yoksa auth_token (JWT) içini çöz
    const userJson = localStorage.getItem('currentUser');
    const token = localStorage.getItem('auth_token');

    const user = userJson ? JSON.parse(userJson) : (token ? parseJwt(token) : null);

    let isAdmin = false;

    if (user) {
        // JWT içinde roller 'roles', 'authorities', 'role' veya 'scope' adıyla tutulabilir
        const roles = user.roles || user.authorities || user.role || user.scope;

        if (Array.isArray(roles)) {
            isAdmin = roles.some((r: any) => {
                const roleName = typeof r === 'string' ? r : (r?.authority || r?.name || r?.role || '');
                return roleName.toUpperCase().includes('ADMIN');
            });
        } else if (typeof roles === 'string') {
            isAdmin = roles.toUpperCase().includes('ADMIN');
        }
    }

    if (isAdmin) {
        return true; // Admin ise girişe izin ver
    }

    // Eğer token içinde de ADMIN rolü yoksa, token'ın içinde ne olduğunu göster:
    alert(
        'Bu sayfaya erişim yetkiniz yok!\n\n' +
        'Token İçeriği: ' + (user ? JSON.stringify(user) : 'Token bulunamadı')
    );
    router.navigate(['/dashboard']);
    return false;
};
const localizedPublicChildren = (): Routes => [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'landing', component: Landing },

    { path: 'gizlilik-politikasi', component: GizlilikPolitikasiComponent },
    { path: 'kullanim-kosullari', component: KullanimKosullariComponent },
    { path: 'iletisim', component: IletisimComponent },

    // Önce iki parçalı mod URL'si, ardından kategori URL'si
    { path: ':categorySlug/:modSlug', component: ModDetailComponent },
    { path: ':categorySlug', component: ModGalleryComponent },

    { path: '**', redirectTo: 'dashboard' }
];
export const appRoutes: Routes = [
    {
        path: 'en',
        component: AppLayout,
        children: localizedPublicChildren()
    },
    {
        path: 'de',
        component: AppLayout,
        children: localizedPublicChildren()
    },
    // 1. Auth yolları (Kullanıcı sadece istediğinde /auth/login adresine gider)
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes').then((m) => m.default) },

    // 2. Bağımsız diğer sabit sayfalar
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },

    // 3. Layout'a bağlı olan, menülü sayfalar (Site açıldığında doğrudan buradaki dashboard açılır)
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

            // SADECE ADMİNİN GİREBİLECEĞİ SAYFA
            {
                path: 'admin',
                component: AdminPanelComponent,
                canActivate: [adminGuard]
            },

            { path: 'dashboard', component: Dashboard },
            { path: 'documentation', component: Documentation },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },

            // İsterseniz kategori/SSS ekleme-güncelleme sayfalarına da canActivate: [adminGuard] ekleyebilirsiniz:
            { path: 'kategori-ekle', component: KategoriEkleComponent },
            { path: 'kategori-getir', component: KategoriGetirComponent },
            { path: 'kategori-guncelle/:id', component: KategoriGuncelleComponent },

            { path: 'kullanici-profil', component: KullaniciProfilComponent },
            { path: 'new-request', component: NewRequestComponent },
            { path: 'sss-ekle', component: SssEkleComponent },
            { path: 'sss-guncelle/:id', component: SssGuncelleComponent },
            { path: 'sss-getir', component: SssGetirComponent },
            { path: 'canli-talepler', component: MyRoomsComponent },

            { path: 'gizlilik-politikasi', component: GizlilikPolitikasiComponent },
            { path: 'kullanim-kosullari', component: KullanimKosullariComponent },
            { path: 'iletisim', component: IletisimComponent },
            // DİNAMİK KATEGORİ VE MOD YOLLARI (Her zaman children listesinin EN ALTINDA olmalı)
            { path: ':categorySlug', component: ModGalleryComponent },
            { path: ':categorySlug/:modSlug', component: ModDetailComponent }
        ]
    },

    // 4. Eşleşmeyen tüm linkleri 404 sayfasına gönder
    { path: '**', redirectTo: '/notfound' }
];

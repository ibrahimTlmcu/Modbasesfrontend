import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/auth/login';
import { DenemeComponent } from './app/pages/deneme/deneme.component';

import { TalepAcComponent } from './app/talep-ac/talep-ac.component';
import { KategoriEkleComponent } from './app/kategori-ekle/kategori-ekle.component';
import { AdminGelenTaleplerComponent } from './app/admin-gelen-talepler/admin-gelen-talepler.component';
import { Register } from './app/pages/auth/Register';
import { KategoriGetirComponent } from './app/kategori-getir/kategori-getir.component';
import { KategoriGuncelleComponent } from './app/kategori-guncelle/kategori-guncelle.component';
import { AdminGelenTalepCevaplaComponent } from './app/admin-gelen-talep-cevapla/admin-gelen-talep-cevapla.component';
import { TalepVeCevapGetirComponent } from './app/talep-ve-cevap-getir/talep-ve-cevap-getir.component';
import { TaleplerimComponent } from './app/taleplerim/taleplerim.component';

import { KullaniciProfilComponent } from './app/kullanici-profil/kullanici-profil.component';
import { CreateTicketComponent } from './app/create-ticket/create-ticket.component';
import { TicketListComponent } from './app/ticket-list/ticket-list.component';
import { ChatRoomComponent } from './app/chat-room/chat-room.component';
import { CevapGetirComponent } from './app/cevap-getir/cevap-getir.component';
import { RatingComponent } from './app/rating/rating.component';
import { NewRequestComponent } from './app/new-request/new-request.component';
import { SssEkleComponent } from './app/sss-ekle/sss-ekle.component';
import { SssGuncelleComponent } from './app/sss-guncelle/sss-guncelle.component';
import { SssGetirComponent } from './app/sss-getir/sss-getir.component';
import { MyRoomsComponent } from './app/my-rooms/my-rooms.component';
import { TranscriptComponent } from './app/transcript/transcript.component';

export const appRoutes: Routes = [
    // 1. Ana yönlendirme: Uygulama açıldığında logine gider
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'register', component: Register },

    // 2. Auth yolları (login sayfası vb. buradan geliyor)
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes').then((m) => m.default) },

    // 3. Layout'a bağlı olan, menülü sayfalar
    {
        path: '',
        component: AppLayout,
        children: [
            // Sadece TEK BİR boş yol yönlendirmesi olmalı (Taleplerim'i varsayılan yaptık, değiştirebilirsiniz)
            { path: '', redirectTo: 'taleplerim', pathMatch: 'full' },

            { path: 'dashboard', component: Dashboard },
            { path: 'documentation', component: Documentation },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'talep-ac', component: TalepAcComponent },
            { path: 'kategori-ekle', component: KategoriEkleComponent },
            { path: 'talep-ve-cevap-getir', component: TalepVeCevapGetirComponent },
            { path: 'kategori-getir', component: KategoriGetirComponent },
            { path: 'cevap-getir/:id', component: CevapGetirComponent },
            { path: 'admin-gelen-talep-cevapla/:id', component: AdminGelenTalepCevaplaComponent },
            { path: 'admin-gelen-talepler', component: AdminGelenTaleplerComponent },
            { path: 'kategori-guncelle/:id', component: KategoriGuncelleComponent },
            { path: 'taleplerim', component: TaleplerimComponent },
            { path: 'rating', component: RatingComponent },
            { path: 'kullanici-profil', component: KullaniciProfilComponent },
            { path: 'create-ticket', component: CreateTicketComponent },
            { path: 'tickets', component: TicketListComponent },
            { path: 'new-request', component: NewRequestComponent },
            { path: 'sss-ekle', component: SssEkleComponent },
            { path: 'sss-guncelle/:id', component: SssGuncelleComponent },
            { path: 'sss-getir', component: SssGetirComponent },
            { path: 'canli-talepler', component: MyRoomsComponent },
            { path: 'gecmis/:roomId', component: TranscriptComponent },
            {
                path: 'chat/:roomId',
                component: ChatRoomComponent,
                runGuardsAndResolvers: 'always'
            }
        ]
    },

    // 4. Bağımsız diğer sayfalar
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },

    // 5. Eşleşmeyen tüm linkleri 404 sayfasına gönder
    { path: '**', redirectTo: '/notfound' }
];

// // app-routing.module.ts
// const routes: Routes = [
//     {
//         path: 'admin',
//         component: AdminDashboardComponent,
//         canActivate: [AuthGuard],
//         data: { roles: ['ADMIN'] }    // sadece ADMIN görebilir
//     },
//     {
//         path: 'tickets',
//         component: TicketListComponent,
//         canActivate: [AuthGuard],
//         data: { roles: ['USER','ADMIN'] } // USER ve ADMIN
//     },
//     // ...
// ];

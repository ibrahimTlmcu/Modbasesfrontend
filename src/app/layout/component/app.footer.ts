import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    selector: 'app-footer',
    template: ` <div class="layout-footer">
        <footer style="  padding: 20px; text-align: center; font-size: 14px;">
            <p>&copy; 2026 ModBases (www.modbases.com). Tüm hakları saklıdır.</p>
            <div style="margin-top: 10px;">
                <a routerLink="/gizlilik-politikasi" style="color: #000000; margin: 0 10px; text-decoration: none;">Gizlilik ve Çerez Politikası</a> |
                <a routerLink="/kullanim-kosullari" style="color: #000000; margin: 0 10px; text-decoration: none;">Kullanım Koşulları ve Telif (DMCA)</a> |
                <a routerLink="/iletisim" style="color: #000000; margin: 0 10px; text-decoration: none;">İletişim : Ibrahım Tulumcu</a>
            </div>
        </footer>
    </div>`
})
export class AppFooter {}

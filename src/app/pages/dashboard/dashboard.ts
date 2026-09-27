import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { FaqService } from '../../services/faq.service';
import { Faq } from '../../models/Faq';
import { HttpClientModule } from '@angular/common/http';
import { Button, ButtonDirective } from 'primeng/button';
import { Router, RouterLink, RouterModule } from '@angular/router';

// WeatherService'i import et
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, HttpClientModule, Accordion, AccordionPanel, AccordionHeader, AccordionContent, Button, RouterLink, ButtonDirective,RouterModule],
    template: `
        <div class="grid grid-cols-12 gap-6">
            <!-- Sık Sorulan Sorular Kartı -->
            <div class="col-span-12 xl:col-span-6">
                <div class="p-5 rounded-xl shadow bg-white border border-gray-200">
                    <div class="font-bold text-2xl mb-4 text-primary">📌 Sık Sorulan Sorular</div>
                    <p-accordion [activeIndex]="0">
                        <p-accordion-panel *ngFor="let faq of faqs; let i = index" [value]="i.toString()">
                            <p-accordion-header>
                                <span class="text-lg font-medium">{{ faq.question }}</span>
                            </p-accordion-header>
                            <p-accordion-content>
                                <p class="text-base text-gray-700">
                                    {{ faq.answer }}
                                </p>
                            </p-accordion-content>
                        </p-accordion-panel>
                    </p-accordion>
                </div>
            </div>

            <!-- Hava Durumu Kartı -->
            <div class="col-span-12 xl:col-span-6">
                <div class="p-5 rounded-xl shadow bg-white border border-gray-200">
                    <!--                    <div class="font-bold text-2xl mb-4 text-primary">🌤️ Güncel Hava Durumu</div>-->
                    <!--                    <div class="flex items-center gap-4 bg-blue-50 p-4 rounded-lg shadow-inner">-->
                    <!--                        <img [src]="weather.iconUrl" alt="hava durumu" width="64" height="64" />-->
                    <!--                        <div>-->
                    <!--                            <div class="text-xl font-semibold">{{ weather.city }}</div>-->
                    <!--                            <div class="text-lg">{{ weather.temp }}°C, {{ weather.description }}</div>-->
                    <!--                            <div class="text-sm text-gray-600">Nem: {{ weather.humidity }}%, Rüzgar: {{ weather.windSpeed }} km/h</div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <div class="mt-4 flex items-start gap-3 bg-blue-100 border border-blue-300 p-3 rounded-md">
                        <span class="text-2xl">💡</span>
                        <p class="text-gray-700 text-sm">
                            Eğer <strong>Sık Sorulan Sorular</strong> içinde yeterli cevabı bulamadıysanız
                            <a [routerLink]="['/talep-ac']" class="text-blue-600 underline">Destek Talebi Oluşturun</a>
                        </p>
                    </div>
                    <!-- Dosya Yükleme Butonları -->
                    <div class="mt-6">
                        <div class="text-lg font-semibold mb-3 text-gray-800">📎 Dosya ile Cevaplama Seçenekleri</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button pButton type="button" class="p-button p-button-info w-full">📄 PDF Ekle ve Yanıt Al</button>
                            <button pButton type="button" class="p-button p-button-success w-full">📊 Excel Yükle ve Yanıt Al</button>
                        </div>
                    </div>
                    <br />
                    <button
                        pButton
                        type="button"
                        class="p-button p-button-info w-full"
                        [routerLink]="['/taleplerim']"
                    >
                        Önceki Destek Talepleri
                    </button>

                </div>
            </div>
        </div>

        <!-- Alt Aksiyon Butonları (kart yapısında) -->
        <div class="grid grid-cols-12 gap-6 mt-6">
            <div class="col-span-12 xl:col-span-6">
                <div class="p-5 rounded-xl shadow bg-white border border-gray-200 text-center">
                    <p-button label="📝 Destek Talebi Oluştur" class="p-button-lg w-full" [routerLink]="['/talep-ac']"></p-button>
                    <p-button class="w-full p-button-outlined p-button-secondary" [routerLink]="['/new-request']"> Canlı Destek <i class="pi pi-phone ml-2"></i> </p-button>
                </div>
            </div>
        </div>

    `
})
export class Dashboard implements OnInit {
    faqs: Faq[] = [];
    weather = {
        city: 'Ankara',
        temp: 0,
        description: '',
        humidity: 0,
        windSpeed: 0,
        iconUrl: ''
    };

    constructor(
        private faqService: FaqService,
        private weatherService: WeatherService,
        private router : Router
    ) {}

    ngOnInit(): void {
        // FAQ verisini çek
        this.faqService.getFaqs().subscribe((data) => {
            this.faqs = data;
        });

        // Hava durumu verisini çek
        this.weatherService.getWeather('Ankara').subscribe({
            next: (data) => {
                this.weather.city = data.name;
                this.weather.temp = Math.round(data.main.temp);
                this.weather.description = data.weather[0].description;
                this.weather.humidity = data.main.humidity;
                this.weather.windSpeed = Math.round(data.wind.speed * 3.6); // m/s -> km/h
                this.weather.iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            },
            error: (err) => {
                console.error('Hava durumu verisi alınamadı:', err);
                // İstersen default bir değer bırakabilirsin
                this.weather.description = 'Veri alınamadı';
                this.weather.iconUrl = '';
            }
        });
    }


    goToTalepelerim(): void {
        // ‘/talepelerim’ yoluna yönlendir
        this.router.navigate(['/taleplerim']);
        // Alternatif olarak:
        // this.router.navigateByUrl('/talepelerim');
    }
}

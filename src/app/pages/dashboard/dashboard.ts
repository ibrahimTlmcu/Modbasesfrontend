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
    imports: [CommonModule, HttpClientModule, Accordion, AccordionPanel, AccordionHeader, AccordionContent, Button, RouterLink, ButtonDirective, RouterModule],
    template: `
        <div class="welcome-container">
            <!-- CANLI AKTİVİTE BANDI (Canlı Platform Hissi İçin) -->
            <div class="live-ticker-bar">
                <div class="ticker-badge"><span class="pulse-dot"></span> Canlı Akış</div>
                <div class="ticker-content">
                    <marquee behavior="scroll" direction="left" scrollamount="4">
                        <span>🟢 <strong>Ahmet_58 </strong> şimdi <em>Cyberpunk 2077 HD Grafik Paketi</em> indirdi (Az önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>KaanGamer </strong> <em>The Witcher 3 Türkçe Yama</em> için 5 yıldız verdi (1 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>ZeynepN </strong> yeni bir mod yükledi: <em>ETS 2 Türkiye Haritası</em> (2 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Burak_TR </strong> <em>Minecraft Shaders</em> paketini indirdi (3 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Selin_Dev </strong> <em>Skyrim Special Edition Türkçe Yama</em> konusuna yorum yaptı (4 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>EmreCan61 </strong> <em>GTA V Realism Mod</em> indirdi (5 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>NightWolf </strong> <em>RDR 2 Türkçe Çeviri</em> dosyasına puan verdi (6 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Merve_06 </strong> yeni bir yama yayınladı: <em>Baldur's Gate 3 Türkçe Çeviri</em> (7 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Cem_B </strong> <em>Mount & Blade II: Bannerlord Diplomacy Mod</em> indirdi (8 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Elif_K </strong> <em>Hogwarts Legacy Türkçe Yama</em> için 5 yıldız verdi (9 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Onur_Pro </strong> <em>Euro Truck Simulator 2 Ses Paketi</em> konusuna yorum yaptı (10 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Deniz_99 </strong> <em>Assetto Corsa Tofaş Doğan SLX Modu</em> indirdi (11 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Kerem_X </strong> <em>Factorio Otomasyon Rehberi</em> konusunu favorilere ekledi (12 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Ayşe_D </strong> <em>Stardew Valley Türkçe Yama</em> için teşekkür mesajı yazdı (13 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Volkan_35 </strong> <em>Mafia Definitive Edition Türkçe Çeviri</em> indirdi (14 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Gizem_S</strong> <em>Detroit Become Human Türkçe Yama</em> hata bildirimi yaptı (15 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Mert_Can</strong> <em>Cities: Skylines Türkiye Bina Paketi</em> yükledi (16 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Ece_G</strong> <em>Resident Evil 4 Remake Türkçe Yama</em> dosyasına 5 yıldız verdi (17 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Baris_T</strong> <em>Fallout 4 Hayatta Kalma Modu</em> indirdi (18 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Yusuf_K</strong> <em>God of War Türkçe Altyazı</em> konusuna yorum yaptı (19 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Nazli_M</strong> yeni bir rehber paylaştı: <em>The Sims 4 Mod Kurulum Rehberi</em> (20 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Emir_58</strong> <em>Dark Souls III Türkçe Yama</em> indirdi (21 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Buse_A</strong> <em>Farming Simulator 22 Türk Traktör Paketi</em> yükledi (22 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Tolga_B</strong> <em>Subnautica Türkçe Çeviri</em> konusuna değerlendirme yaptı (23 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Melis_D</strong> <em>Terraria Kalite Of Life Modu</em> indirdi (24 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Arda_K</strong> <em>Dead Space Remake Türkçe Yama</em> için 5 yıldız verdi (25 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Sude_N</strong> <em>Left 4 Dead 2 Custom Harita</em> yükledi (26 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Kutay_T</strong> <em>Disco Elysium Türkçe Yama</em> hata bildiriminde bulundu (27 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Ceren_L</strong> <em>Portal 2 Hikaye Modu</em> indirdi (28 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Berk_Can</strong> <em>Mass Effect Legendary Edition Türkçe Yama</em> indirdi (29 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>İrem_S</strong> <em>Planet Zoo Hayvan Paketi</em> yükledi (30 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Tarik_M</strong> <em>Horizon Zero Dawn Türkçe Yama</em> konusuna yorum yaptı (31 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Deren_K</strong> <em>BeamNG.drive İstanbul Haritası</em> indirdi (32 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Tolgahan</strong> <em>Alan Wake 2 Türkçe Çeviri</em> için 5 yıldız verdi (33 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Aslı_B</strong> <em>Phasmophobia Türkçe Arayüz Modu</em> yükledi (34 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Umut_X</strong> <em>Outer Wilds Türkçe Yama</em> konusuna destek mesajı yazdı (35 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Yağmur_T</strong> <em>Age of Empires II Türkçe Seslendirme Paketi</em> indirdi (36 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Batuhan_S</strong> <em>Days Gone Türkçe Yama</em> için puanlama yaptı (37 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Dila_N</strong> <em>Sims 4 Gerçekçi Yaşam Modu</em> paylaştı (38 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Doruk_K</strong> <em>Ghost of Tsushima Türkçe Yama</em> konusunu güncelledi (39 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Pelin_M</strong> <em>Stardew Valley Genişletme Modu</em> indirdi (40 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Yiğit_E</strong> <em>Dragon Age: Inquisition Türkçe Yama</em> indirdi (41 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Defne_R</strong> <em>Grand Theft Auto: San Andreas Multiplayer Paketi</em> yükledi (42 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Efe_Can</strong> <em>Cyberpunk 2077 Optimizasyon Modu</em> yorumlarında soru sordu (43 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Naz_K</strong> <em>Valheim Türk Oyuncular Mod Paketi</em> indirdi (44 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Kaan_T</strong> <em>Red Dead Redemption 1 PC Türkçe Yama</em> için 5 yıldız verdi (45 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Büşra_Ş</strong> <em>Skyrim Görev Modu</em> yükledi (46 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Caner_V</strong> <em>The Witcher 2 Türkçe Yama</em> hata çözümüne katkı sağladı (47 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Nil_A</strong> <em>Cities: Skylines 2 Performans Modu</em> indirdi (48 dk önce)</span>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 Son 1 saatte toplam **486 indirme** gerçekleştirildi!</span>
                    </marquee>
                </div>
            </div>

            <!-- Üst Karşılama ve Arama Alanı (Yumuşak Pastel Gradyen) -->
            <div class="welcome-hero">
                <div class="hero-text">
                    <h1>Modbases.com'a Hoş Geldiniz!</h1>
                    <p>En popüler oyun modlarını, Türkçe yamaları ve güvenli yazılımları keşfedin.</p>
                </div>
                <div class="hero-search">
                    <input type="text" placeholder="Mod, yama veya program ara..." />
                    <button type="button"><i class="fa-solid fa-search"></i> Ara</button>
                </div>
            </div>

            <!-- Hızlı İstatistikler / Özet Kartları -->
            <div class="stats-grid">
                <!-- 1. Video Kartı -->
                <div class="stat-card video-card">
                    <iframe src="https://www.youtube.com/embed/-_h9EvnFm4g?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&start=2300&end=3120" loading="lazy"></iframe>
                </div>
                <!-- 2. Video Kartı -->
                <div class="stat-card video-card">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/WBXvdFeMH70?si=9aXIzjAy0sgrKe1C&amp;autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&start=2400&end=3120" loading="lazy"></iframe>
                </div>

                <!-- 3. İstatistik Kartı -->
                <div class="stat-card info-card">
                    <div class="stat-icon app"><i class="fa-solid fa-download"></i></div>
                    <div class="stat-info">
                        <h3>85K+</h3>
                        <p>Toplam İndirme</p>
                    </div>
                </div>
            </div>

            <!-- Görsel Öne Çıkanlar Grid Alanı -->
            <div class="section-title">
                <h2>🔥 Öne Çıkan Görsel İçerikler</h2>
                <a href="#" class="see-all">Tümünü Gör</a>
            </div>

            <div class="content-grid">
                <!-- Kart 1 -->
                <div class="media-card">
                    <div class="card-img-wrap">
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop" alt="Cyberpunk Mod" />
                        <span class="badge mod">Oyun Modu</span>
                        <span class="live-badge"><i class="fa-solid fa-fire text-yellow"></i> 42 kişi inceliyor</span>
                    </div>
                    <div class="card-details">
                        <div class="meta-row">
                            <span><i class="fa-solid fa-download"></i> 14.2K</span>
                            <span><i class="fa-solid fa-star text-yellow"></i> 4.9</span>
                        </div>
                        <h3>Team Speak 3 Ücretsiz İndir</h3>
                        <p>Oyun içi iletişimin adresi.</p>
                        <a href="https://modbases.com/program/ts3-team-speak-ucretsiz-indir" target="_blank" class="btn-download-card">Hemen İndir</a>
                    </div>
                </div>

                <!-- Kart 2 -->
                <div class="media-card">
                    <div class="card-img-wrap">
                        <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExMWFhUXGBkYFRcYFxgXFxcaFxkZGh0bHRgYHSggGholHRoYIjEiJykrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGi8lHyEtLy0tLS0tLS0tLTU1Li0tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQoAvgMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBAUGB//EAEoQAAEDAgMFBQUEBwMKBwAAAAEAAhEDIQQSMQVBUWHwBhNxgZEiMqGxwQeC0eEUI0JicpLxM1KiFlNUc4OTwsPS0xdDRGR0o7L/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACQRAQEAAgICAQQDAQAAAAAAAAABAhEDIRIxYSJBUXEysfCB/9oADAMBAAIRAxEAPwDyJRRRdGRChCgTQgmVEBQdddaqQgCkJlIQLCMJsqmVAgCkJw1ZeAwbi+mY9kuF91iJHI8lLdEjAAUhZWJwjmlxIgAxO6+gHE6WVBakuzREY668UwCgCoUNQyq2EpCBCFExCEIACgUSoAgDglKZAoIoiEQggCZQDrzRA63oIiUQE2Xf11CIUhENTAdddWUKFNTDN+byj69WWVT/AEfeK3kWeP8AdWIB111ZE9deqlhK2VH9D3tq+b/+li3eFcwN/VgRofbcXm2hBZc6G5BFuN+Zx2H7t+WbgAnxIBPxJUwmJc1zIdAB03CTfzMrnlhudVuZavbf4h9MsBcAW/sw9wcLTYNp2tfUzJ1laqqcJuFX7rh/xMWDVruOa8gnlFtE1DD5g872gO8pv8Pkkx8Z3Ty3RcKG4VfMs+gVDw39nN5kJWN6680evl+K6aZtABBwRB6681AbkddfmqhQJQyp8vXXVkYQVFqkKxzUI666sgrKQhWEIFFICiEAE7UBaE+mpGtvNRsTE84TuFid3w0P4oIErxJA8z9B638lbTaYE/0mLT1osbCyXu3gyZ8CI8LIMgdddaoHrrrenIQDSba9deqIC2WwMIX1MxFmQfvbh8z5c1hVhEN4a9a9FdRQwxw+FeSIcGZnae++zR4i3qufLlqftvCdtLtt9OoTUYfaByv1vrDhytE+C1YRymwFzoAFbiaBpvcw3LTBjiNfS/otYzxmmLd9qGrebIbTbAJ9t40vYbh56+Y5LSgdeiak/KQ7e0z6X+iZ4+U0uN1VmMw/d1C3du/hOn4Klw3rpNv4MGn3jR7kOPNj7g+s+hXOtMyNY+QU48t4rnjqqiOuurJKxI9rhrzB6ny5q0lE3665/BbZBp3pWuvG+D6T9euddAxLf7unh+SRlRwc50SNCeEIrKcOuvJKQpTqtdofI6/mmcOvTlrqiKj111okjnCtcFW4IKx116JnVALu049fmEGKVWktIiSRxA+eqVU7sPOYOiOEgi++bhWEOiDwsY3jfbnHHRUCqCG5wQQYnTl726LGE9es5pjNIIsbSR4ix9FA1anJgBzjHsxAbHKDbzTYXDuZ70HhHKTvA4qzBvMZnHcJPqQPISfMcE+HqZgHcSY5cuaBnKzDDV3DSZ3QLeoPgleeutd6sxMNa1m++YRGh0ub2tP73JVGw7J7PFasC61OmO8fwyt0HmRMcAVu+2D8uGpg2dWeajgdcrYMHmJYPurYbH2SKeGo0iP1mKfmfxFFgzGeEtgeNUrT/aDiM2JyA2psAjm72j8C30Xm358k+P8Af26/xxctRqZXNdrlId45SD9IXRdq9jO7/NSa54qjPDWl0Gb6Dfb1Kwuzez2V8Q1jz7JlxH97KJyzunjwBXqIrMbGYtYNLkAeF7JzctwzmvZhh5Tt5RS2FX1fSfTYJL3vaWtaN5vr4b1ryF3PanYmMrk1WvbWpAy1lM+6P4bhzo1IkmfJcQ4fh8V148vKbYymnbbEh+FouNxehU8HENb/AMseDiuP2lg3UKzmH9l2satMEH4j1XVdgmitTxOFJjMA4RqJGUkeH6s+iXtVhDXwtLFx7bCaOIHAtOU/458nhccb4cln++HSzeO3HVozWNjHPXjZTL1116rIw7c7CwzmHu75twjU/ksYtn69dar0uKnFtgB4/Z18Ckw7fZcToToNeZ9LeSeo1w09oHWY/JK2oZLXDfPlrCKupQ1sWHH6fCEzXh2hB4/ErDqloeS64I9nhpE+Kvw1IyXGwIiN53yeFlUNUb16pXK55668/RUuQVhO38EgKbW0keET67vyRVwpCROot8d4Cxq9EB0XjWIibbo8h4lNUcWC2kQDw6G/8VXQc4lrRu38Be/koLSxxECNb3tE/UiPALJpNIFyDfdIF+H9N4RsNLfgI3+XWqSoYFonQb+HXkqjIwnvZyDDd8Wnde++3qtr2O2R+l4pjDdnvP8A9Ww6feMD7w4LV1m5WNY03cJN/WSNbDfoZ4r0Ps2wbP2bVxjhFSqB3drxJbTHmSXeEcFz5MtT9tYzdbvZwFfF4ivbJSjDUtIlsPqkeLi0eDQvKNr4rva1Wr/fe4jw3f4co8l7P2f2P3WCp0CSHmn7bt+eoCXG+8En0C8d27sWrhKndVW/wOHu1AN4PpIsQuPBcfKunJLqM7sziGUWV65Ac+mGhg45iWz4Tlkjd4302Nxb6r89Rxc479wjcNwGth81QSs7Zmyq2IdFGm58ESRZo8XOsPXevRqY25Vy3b0bs/tV+FrNqMJif1jbw9u8EcYkjgYW2+0TBNpYw5bZ2ioY/vEuB9SyfMrcbH7GswwGIxtVgFOHBgu2d0k3dcWaBc8Vyvabav6XiH1o9mA1gOuVthPMyT96OC545TLPeP4as1jqszsFie7xtKdHzTP3hbzzALtv0ZrcZXwlT+yxbO+Z/GBlqCOJaA/yXF9jNg1cTXY9oinTe1z36CWEOyt4k/AeU9328pOZSp4tkZ8NVDxzY72XDwNp5SuXNq8mvhvDfi8txtB+GruY73qbsptrwPgdfvKnE0spB1DgDJ3mP6+gXZ/aLgGVW0sbTuyo1rXHxBLDPGCW/wAq41kvplpiWmSeGgsN5JIPou+GfljtzymrpjlU1HXJAkgR69fFW5rTp9N30QpsgHn8hK6Mq3NBFj4i1/EcVKmIIJbF5tNp3aKg0faI3i45j8Ue9OYOcLDkorKqdfHh1dIeuvRHMCLdQkqFVFYPXmrGHrq6rAVjQimdJGUb9d1h4cSVdSZlbEj0j69BVs48YjwGn4xzVrT1fmibGFZgozlxiGgkAxc+Yix+R8FU50C2u7x6v4SsjFDJTbTEZnEGfHfPhM8whGX2U2ScZiWUho4nMR+zTbd7uXAc8q9J7RZcTtHC4Bo/V0IrVQNBlEtbyAED/aBUfZns9mEwlXHVRAc05Z3UqfDm5w/wtVv2Y0X1XYnH1R7dZ5a3kB7TgOQJa37i8vJl3b+P7dsZ6n5N9qW1n0aNOnTe5rqrySWktdkYBIBBkS5zfQrz+v2hqVMM7DVnGpDmvpPcZexwNxmNy0tzcx8tx9qmLz43IDalTa3wc72z8CweS5CphntaHljg13uuLCGndZ0Qd+hXTiwkwjGeV8q3XYvYQxeJDHf2bBnqRqQIAbOokx5A716B2z22NnUWMosYHPkMbENY1sScoiTcQOcnSDy32SYxrMU+kT/a0jl5upumBx9nMfJbr7S9mGq+mNC62HcTDTV0dRcTZpe0MLCbZmEWlc+Tvlky9NY/w3Hm+0dp1sQ7PWqOebxJsPBos3yhY0oOBBIIgiQRcEEWIIOhBmxQnrrq69U69OVb7FdparqVKhSc6jSpsa2GHK5749pzi3i6SBoN916F2axP6ZgQ2ocxIdTqHeSLAmd+UtPnK8jbRdlz5XZTo6DlmNA7QnTeu8+zHF/21KeFQD/C75MXn58J4bn2dOO99ruyrRWwtfAVT7VKW+F5BHNrwfVq4Ko11Gqc0hzSWvAMGQTv3TcTzHBdptiuMJtJlafYrCH/AAa4+AORx8Vh/aJsyKja4Fqoyv5PbofMD/Cpx5ay+Mu1ynX6cjWp5XA2hwzCOuA+CARac9PKfeaZHKLHym/pxvUx03/r4fOy9LlVdcftDUKwPm6DnJGWtu3ddaoGLfJI5OSkcgUBM0JR10E4RTtcsiiwHU5fInluCx29enwVg0KIzGYamXAmsAB+483O+w5/FZX6NRc/M7FDcLU6hIHK0aAenNaoC/XXH4KF3XXNTRt6Bt/b+GxFJmHp4p1HDsDQKYwz3E5B7OZxcJAgEAAXF5tG22F2zwGFw9Og17yGNgnunDMSZcYOkuJOu9eVF3XXVlkbNw4q1G0y4tL3NaDlzXcQBIzC1/yXPLixs1W5ndt12gq0MRiatduIgVHZgHUqsxAEGG7tPALL7JbYpYOo7PiA+g8EVaXdVSHWscrmxm3X1BjgudGzXOax1KXh7Z0a1w9qoLtDjaKbjm0MFPgtm521HPeGBjm0zLqbbvLzq97QQAxxgGTaN5Fsx8dJu723GIxGBZUNXDVnU3tqNq0D3dS1xmY+NWTMEXglpkLqdu9tMBisPUoPc6Htt+qeQ137J03Oj0XnzdjOL2NzWLyxxIADSHlm90OmCQAd2/VYjsBVa3M5uWwJlzQQHaWJncbRKlwxy1u+l87G02k+hWDHOxA70AtqP7qrFSLMcfZnPAgneADqSs7ZVTZ1Koxz3l4Y0G9N8vqb3EEQGD9lo3yTK0r9kzRbUYXOJAJjLlbIeTml2ZgAbOYiHTbRUs2ZVIENBBsIewzLiwR7V5cCBxymJVsl62m2025jW4qq6o7EiNKbclWGNtDR7MDdPEyr+zOMoYasajq8gsLYbTqSZLSJlo4HqVqquynNaHgktgOeYAyAspu3m/8AaR4jmlw+DDmd5mMNLhUsPZhss33z3A5gjgrcZcdfY3duo7RbXwmKYG96WkOkO7tzrEGRFtbegS1Ns0H4U4erWL3ZYY/ungy2MpIvcGPEeq40E9deHVkQOuvL1WZw4ySfhbnWS2gxrsza7RP7lTw3s4H4LHdSaCYqgjkH6+Y5JS3rrx+CrPXXWi6aY2LwNxnyKBbKMIwqFCR5Tx11zSuCBUeurpWpmmEU4+OiJPXjdIDy5JplEP1802SRq3+Zo4cSrNmYF1esyiw+09waCdBvJ8AAStkcLgS51Pv8QxwloqPYzuiRa7QcwHn4qXLXSyNY3Du4s/3lP6u8fRXYWlVY9rmuY1zTLT31Cx43fuKwvh9FuH7KpjAtxWZ+d1Xu8vs5BEmdJ0A370t0aLSbiGgBr6cREd9hoj27RnuPbqW/fKrp4auA4B1OHwHjv8MQYMixfEgmxiR5q+hsyk3C/pFY1Gve4igxuUd4AAS45gcrJ3+nPUCJvpvixjlKkuy9NtnxWYkPpt9ougVsNAJfm0LzvuDqLxreipQxDwQ59MghoP6/DXDfdmHySOOvor+0eyadDun0nOfSq087XuAF5u2BpAjzPJVbc2cyh3bAX96abX1gSIpueAcogTIBvJ3hSWVdfk7X4u3t0xAAEV8KJABAaYfdoDiA0yACYCFOniRo+kItavhhbOXjR+ocXOB1BcYVnZnZFPEGqKj3t7ukansBpkNIkQ7fcb+KycBsbDYkmnh6tZtXKXNbWpsyujUB1N5g+KXKQYj24gjLnp5cuX+2wwtla2JD5uGgEcAsYYWq1rmhzMrozAV6N8pkTFTcb+awyD1+XX02m29mMosw72OeTWp94Q6PZkCAIHEm54BXeukYP6M4Xmn/AL2kf+NI6keLfDO0/XqFsezey6Vd1QVajqYY0OzCI1gzItqsPaOz30KrqThJBtA94HQjxU8pvS662pPr6Hq6Xn11+C3eP2I2jQFQvJqZmtc0RlaSM0HwB+K072jdP1+EK45S+kuOvZMt+uuNlD5fXr8U729eM9eSrWmSuPXmlgonrrrVKSikanCQJgUUzUSevU/RQQmRF+z8S+lUbVp++w5m2nTWeUWPIldbTp4PaboaDhcY6SBrSquAk+cSdx/iuuV2Zi+5qtqZGvjMHMd7r2vaWOBji15vu5rdYPa2CoPFejh65qtuxtWo00qbjN/ZGZ8SbFc85b69t41z1ek5jnMdZzXFrhwIJaR5FdXhO7GzcO+sCaX6YQ8N1y5Hz/TeLW1HJV6jnuc9xlznFzjxc4yfWStu7a7DgG4TK/O2saub2ct8zYsZ0OqZy2RIye12ArsqNrVXMfTqj9Q+mZplgEta0Eez7MHL43NytBPXXn6Lf7J7QsGEq4PENfUpuIdRLMuak65JBcdJvHNw3rQnl+H9FrDetVMtfZ2nYupTrUKtKu0vGGBxVODuZdzfAki37x5LkcRXdVe6o+7nnM4+N7Tu3eEaLa9m9r08MMRna9xrUXUhliwfck5iNLLTtvHXW70Uxx1aW9R0fYdknF//ABK3wyqzAkUMN+lYem97y0sqVHOaRh3TB/VgAmZBa6SIPjOu7O7TZQ70uD/1tJ1P2YMB8EkyQq9hbY/Ry8ObnpVWltVnEX0m0iY1GpUuNtv/ABZZqNSTbrret12lfNLBgf5hv0WnrZZOWcv7OaJibTHgCszamNZUZRawPHdsyHNAkCL2J6Kt7yhPVX7CEU8UP/bu+Y+iysJttndNdVGatRGWiTvmwn+Hny3rXbKxtOkyu17XnvafdjLltM3Mkb8qwR11wU8PK3a+Wo27qrnYMkmSa0k7zLdVqp68+QWa3FNGH7mHZs2abZdw4z8FgEdW5rWM1tMuzylPXXil665pnddea0wqcUhTuHXiq3FGghEIBFA7E89eqrCsaiImFksJwiIOvj+XqvS+yPYKm+j3mJBzOMgAiw8wR+NzoQvNOuK7Tsx2+OGpd3UY6pB9mCLDXU7/AOupM8eaZ3H6XTj1vt1tTsZs5szmEOynSzi3MB7m8aczGtlVX7FbPvlLwQS0iLggPJEBnBjjzEayJ1v/AImUZJ/RTfmzny/ed/MeKn/ibSmf0Z0zMy3W99Nfad/MeK8vjzfLrvBdiex2CYC4vdAAJPJzsoPu3kqHsdhZiXTmyxb3g0uj3f7t/wCqxn/aXQNjhDoBfJoLgaaA6BA/aTR/0R3HVmsi+nIeivjzfJvBl4Xshg6gGUuMiRwIktmSziI/qqanZTBWILocJBjdB/c5O9FQPtIpNjLhnCNILRztHNUH7QKH+ikWjVmlxGmlz8VfHm+V3gyqnZTBjXNbUnT3c2pbwEqp3ZfBkgDNJkAG1x92xVJ+0Gkf/TO46t4R8rKv/L2jaMMRGl2215eKnjzfJvjYfaLss2nTz0gTHvDx8Or87cmCuh7Q9qTiGBjGFjb5gbz6burzbnxw6vb66r1cMymP1OPJrfQSmakPJEa261XVgrtevomKV5+iKFVvVRTuKrciiEyUFOCggVzC3e1x8HAfNpVMKzdKIyG1KW+nUP8AtWj/AJSspVKBmKFaRrFdpiP9hpv81hA3TUqmV4MSDYjj8R1Cmjbddn8PhsTVbSLatMuDgw98xwNQCQ0/qRAMETxhZ2wNh0a9d+HrMr0KjG5g01GOJiAf/KHEaTN1y7ppVJY64Ic1w3ObBB4bh/KvUq+JbiKNDH0wBUpjM6Ncvu1qdtY9qOYHFceS3H193TCStZtLsRSZTLqXe1XDVhqMaSOR7s39Fx73UQ6H0awixHfNBG/Q0NV62+sI1suG2ntWm/FOpYhjRkfFOsAJbwFQGz2Xvpb1WOLkyvV7b5MJPTG2Ps7Z2IcGd7iKbzo15piTwDmsIPhbkFvv8gcN/nK381P/AKFpdu7OwnfGkCcPUhpadaLs27iy4PK2/RdRsLH1HUstX+1pnJU4kiIdzkEGfFTkyy1vGmEnqxgf5BYX/OVvWn/0LR7e2RgMKcpqV31InI11O06ZnFns+FzyXV19p/rm0miXNY6o4A8BlaOUlx9Aub2PhMO+pUNVwrVQ11SpUN6DDO4H34M3NoFkwyy95Uyk9SObw7aTyGsoVnONmgVmkn/6Fv8AD9nqBrUsO7ve+dJqtbVY4UWhpdd3dCXG3s7pF9JGzNvspVC3D0wG5ahdUeJq1XNY5wJ3MaXD3Y9NFs+y+G/RcPVx1Uy9zC4TrBuJ5vdHwXTPKyf0zjJWkrbKw/6aMJTbWf7YZn71gvq4wKJs32t/7JWLtYYWjWfTY2s9rXFoeazGzA9ox3JtMjnA4rI2BWNGlXxrj+svSpHjVq3e77ov5kLnqAkyN3HkZN+tFvH3+mazq1SiNKNUG1jWb/2eSpc6nua/+dv/AG1Q98uncNBwg/l8Ch181vTFo1IO4/zT9AlcExHySA69W3BUI5IQmlK5FMEZSIgoLAUGG5b5jw6+aEoVGkxGo/DREWlK4Jp6/NAICTmZwc3w6N/muu+zzasF2HJs722cnAQ4eYEx+6VyVF2V19DY9eXwVlGq6jVDmm7XBw4GCJG+xG7mVjPHyxsaxurt6th4aCzcz2R/D+zpwBA+6V5fj8T3lSpU3OcSJ4E2+EL0N2JFWnmaYD2GDwkfMElebV6Lqbixwhwt/TkuXBNW/l05b1GRj8YavdzqymGHnlc6DO+xC6fsdtTMDSfdzWjKd7mjQH+HNbkY3LjFtOzNXLiWc5B5+yfqAunJjLjpzwyvkz8TiC2pj374DJ4Bzw35BafC4wspVWC3eZAfBpJI+Q9Vn7SN8ZwNSmPRzj9FpCrjNwyuqztkOAqszaOlh++Cz4ZpXU9tsZFKnh2AkuMkD+6zQRzP/wCSuNw1Nz3ta33iYHzny1XZ1K/cNfXcS58BrS65IFgJPFxLj48ljk/lK1h6rnO0FbKKWFabUW+1wNV/tPPONPIrWl2VsDf8vXxskaC5xcTe5JPHUlB5kzuGi6Sa6Yt2LbdeCIQHXXwUdUAseBP1WmQfrHmfCbeqBKlOdTqb+HAen1Qd116opSkJUJUJRTKBAJ2oJMXSCuCSDYjQjrVF7Q430G7ifyWJVaAbGePLkoRnwY974yUGWkdcPoqqT2tAkX104qZrnjaR15eaoyIkfLxUcZbOhHhx6CXNuQYb6W649aqI6nsjjpaaJOntM8DqPWD94rP2ts1tcC4a8aO5cDxHyXHYHEmlVDxeDPiD7w8/quwdjAHtaXACoAaZ3EnUcjcEcZPJcM5Zdx2xu5quRxmHNN7qZIJbaRobSsvYLSa7I/ZJJ8AD+I9VRtp36+p4/QLcdm6QYx1U6nQ8Gt39cAumV+lzxn1F7SNaxmUe9UqGo7doI+Ej4rUbPwRqvyAgWJk9c1NoYw1Xl500aOAGnznzKOz3wX/6t8fA/RWSzEt3XR7J2a2iJdBeTAP0HOJK1najGyRTH7PtHxIt6C/3lX39RjRXe/MXNikCSYJABMHSIk8SVp3uJJOpnU7ydT+fNZxx+rdauXWof3W8DogB18fxSA9ddXTjVdGEAWBiqku5dfis5zgBJMDr4rFbQDjmOmoAueN/wulItbVm5EfEfkU7kA4ESNOQhAlUK5SVClJQREuhIOvgmQLRqxYmInXrX8UCc5iSG3AUezeP6q5rAPHyEeQ3qKLRbwFuNlUx8uJ9Px64q1zTrvVNRw1G6bfNEXApVJQBVDTay2rave4Uj9qiQ5v8Bn5X9AtOCsrZuJ7t4J90y138LrH018lnKLFu1nzWeeJB9QFvduOy4cZPdcWj7sW8tFodrWrPHAj5BbbAu7zBva7RgIBOnsjMPjb0WcvtVn3aIq7DVw0kluYEFsTl1EawYWKUZXRhdicSX8gLNbJho4Dx1PNVBKhKKcFK+RvtI49cFAUQgorYUe9u33P9fmgyi1pBab7g7T1G/wAlfSO/ibDgDp+KFQA6jw3KLslOuXEtyxxvp8Fa9CeAjigVUKlceSZBygEqApQUZQOCoSeNvNIE2ZAzXcCT5wOHAlCoJnn8I61KiCGwZa3DTr1RUdxUQSVAgoFRl4LDurVA2ddTwAgee4LYbaxgAGHp2Y33ubh+B+PgsHZOKFOq0nQ+yfA/nCu2vgi15cwEtcTpeHTcLF/l219mvzIrbYTY47s1axLQBOUawOPCeHNaZall9M6MSggUFQzSo7SOPy3/AEHmlRPXXWqlIaUA5LKioaUJQUlTYJKBQlAoACig1RRRBRKjQiiIoohKohQlQqICEUoRJQQrasxB/V1mvc32msrQ4geyRBMayzjwK1Sy9l1G5iyoYpvEOPAi7XeR+amS4t32nxoytptIOb2iQZBaNLjcTfyXNynxeI7x5foDoODRYDyACqlTGahld0ZQKiC0hggSogghKCiiAyogoghKhUQUIKgQaigMpiUiiBiUFCigACCYKBAqIUCJVABUUUUEUhQIqgSogUVBESg3r0UQBRRRBCpCihQCECmKCD//2Q=="
                            alt="Witcher Yama"
                        />
                        <span class="badge yama">Türkçe Yama</span>
                        <span class="live-badge"><i class="fa-solid fa-fire text-yellow"></i> Popüler</span>
                    </div>
                    <div class="card-details">
                        <div class="meta-row">
                            <span><i class="fa-solid fa-download"></i> 32.5K</span>
                            <span><i class="fa-solid fa-star text-yellow"></i> 5.0</span>
                        </div>
                        <h3>Skyrim Special Edition ve Anniversary Edition Türkçe Yama</h3>
                        <p>Skyrim Special Edition ve Anniversary profesyonel hikaye ve arayüz çevirisi.</p>
                        <a href="https://modbases.com/the-elder-scrolls-v-skyrim/tr-gezinmeyi-atla-skyrim-turkce-yama-avatar-resmi-skyrim-special-edition-ve-anniversary-edition-turkce-yama" target="_blank" class="btn-download-card">Hemen İndir</a>
                    </div>
                </div>
                <!-- Kart 2 -->
                <div class="media-card">
                    <div class="card-img-wrap">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyY-dIDLA3yXG7OZDcpGOOpGh_UBhh8ZHzOUXgsRy7TQ&s=10" alt="Witcher Yama" />
                        <span class="badge yama text-purple-800">Türkçe Yama</span>
                        <span class="live-badge"><i class="fa-solid fa-fire text-purple-800"></i> Popüler</span>
                    </div>
                    <div class="card-details">
                        <div class="meta-row">
                            <span><i class="fa-solid fa-download"></i> 32.5K</span>
                            <span><i class="fa-solid fa-star text-purple-800"></i> 5.0</span>
                        </div>
                        <h3>Minecraft PC İndir – Full Team Extreme Türkçe v1.21 Online Server</h3>
                        <p>Minecraft online sürümü tek tıkla indir ve oyna .</p>
                        <a href="http://localhost:4200/minecraft/minecraft-pc-indir-full-team-extreme-turkce-v121-online-server" target="_blank" class="btn-download-card">Hemen İndir</a>
                    </div>
                </div>
                <!-- Kart 3 -->
                <div class="media-card">
                    <div class="card-img-wrap">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYEwpf5JmiRsk8xaH7iW_IvP3Dyc8rb1tr4c_jQ_ulA&s=10" alt="ETS 2 Mod" />
                        <span class="badge mod">Oyun Modu</span>
                        <span class="live-badge"><i class="fa-solid fa-rotate text-green"></i> Bugün Güncellendi</span>
                    </div>
                    <div class="card-details">
                        <div class="meta-row">
                            <span><i class="fa-solid fa-download"></i> 19.8K</span>
                            <span><i class="fa-solid fa-star text-yellow"></i> 4.8</span>
                        </div>
                        <h3>ETS 2 Türkiye Haritası Genişlemesi</h3>
                        <p>Gerçekçi şehirler, yeni yollar ve otobüs terminalleri paketi.</p>
                        <a href="https://modbases.com/ets2-modlar/ets2-turkiye-haritasi-modu" target="_blank" class="btn-download-card">Hemen İndir</a>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .welcome-container {
                padding: 24px;
                background-color: #f8fafc;
                color: #334155;
                min-height: 100%;
            }

            /* CANLI AKTİVİTE BANDI STİLLERİ */
            .live-ticker-bar {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 10px 15px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
            }

            .ticker-badge {
                background: #f1f5f9;
                color: #0f172a;
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 8px;
                white-space: nowrap;
                border: 1px solid #e2e8f0;
            }

            /* Nabız (Pulse) Efekti */
            .pulse-dot {
                width: 8px;
                height: 8px;
                background-color: #10b981;
                border-radius: 50%;
                display: inline-block;
                box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
                }
                70% {
                    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
                }
            }

            .ticker-content {
                flex: 1;
                overflow: hidden;
                font-size: 13px;
                color: #64748b;
                font-weight: 500;
            }

            /* Kart Üstü Canlı Rozet */
            .live-badge {
                position: absolute;
                bottom: 8px;
                left: 8px;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(4px);
                color: #fff;
                padding: 3px 8px;
                font-size: 10px;
                font-weight: 600;
                border-radius: 4px;
            }

            /* Pastel Gradyen Hero Alanı */
            .welcome-hero {
                background: linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%);
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 35px;
                margin-bottom: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
            }

            .hero-text h1 {
                font-size: 26px;
                color: #0f172a;
                margin-bottom: 8px;
                font-weight: 700;
            }

            .hero-text p {
                font-size: 15px;
                color: #64748b;
            }

            .hero-search {
                display: flex;
                background: #ffffff;
                border: 1px solid #cbd5e1;
                border-radius: 10px;
                overflow: hidden;
                width: 100%;
                max-width: 420px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
            }

            .hero-search input {
                flex: 1;
                background: transparent;
                border: none;
                padding: 12px 16px;
                color: #1e293b;
                outline: none;
                font-size: 14px;
            }

            .hero-search input::placeholder {
                color: #94a3b8;
            }

            .hero-search button {
                background: linear-gradient(135deg, #0ea5e9, #0284c7);
                border: none;
                color: #fff;
                padding: 0 22px;
                cursor: pointer;
                font-weight: 600;
                transition: opacity 0.2s;
            }

            .hero-search button:hover {
                opacity: 0.9;
            }

            /* İstatistik Kartları */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .stat-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
            }

            .stat-icon {
                width: 48px;
                height: 48px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: #fff;
            }

            .stat-icon.mod {
                background: linear-gradient(135deg, #10b981, #059669);
            }

            .stat-icon.yama {
                background: linear-gradient(135deg, #f59e0b, #d97706);
            }

            .stat-icon.app {
                background: linear-gradient(135deg, #0af468, #2563eb);
            }

            .stat-info h3 {
                font-size: 20px;
                color: #0f172a;
                margin-bottom: 2px;
                font-weight: 700;
            }

            .stat-info p {
                font-size: 13px;
                color: #64748b;
            }

            .section-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 18px;
            }

            .section-title h2 {
                font-size: 18px;
                color: #0f172a;
                font-weight: 700;
            }

            .see-all {
                font-size: 14px;
                color: #0284c7;
                text-decoration: none;
                font-weight: 600;
            }

            .see-all:hover {
                text-decoration: underline;
            }

            /* İçerik Kartları */
            .content-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
                gap: 22px;
            }

            .media-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                transition:
                    transform 0.2s ease,
                    box-shadow 0.2s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
            }

            .media-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                border-color: #cbd5e1;
            }

            .card-img-wrap {
                position: relative;
                height: 150px;
            }

            .card-img-wrap img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .badge {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 4px 10px;
                font-size: 11px;
                font-weight: 600;
                border-radius: 6px;
                color: #fff;
            }

            /* Ana kartımız - Dışarı taşan her şeyi jilet gibi keser */
            .video-card {
                position: relative;
                overflow: hidden !important; /* Dışarı taşan UI elemanlarını kesinlikle gizler */
                border-radius: 12px;
                min-height: 200px;
                padding: 0;
            }

            /* Videonun kendisi - Kartın çok ötesine taşıp arayüzü saklar */
            .video-card iframe {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 250%; /* Kartın 2.5 katı genişlik */
                height: 250%; /* Kartın 2.5 katı yükseklik */
                transform: translate(-50%, -50%); /* Videonun tam ortasını kartın ortasına odaklar */
                pointer-events: none; /* Fareyle üzerine gelinmesini/tıklanmasını tamamen engeller */
                border: none;
            }

            .badge.mod {
                background: rgba(16, 185, 129, 0.9);
                backdrop-filter: blur(4px);
            }

            .badge.yama {
                background: rgba(245, 158, 11, 0.9);
                backdrop-filter: blur(4px);
            }

            .card-details {
                padding: 18px;
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            .meta-row {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: #64748b;
                margin-bottom: 10px;
                font-weight: 500;
            }

            .card-details h3 {
                font-size: 15px;
                color: #0f172a;
                margin-bottom: 8px;
                font-weight: 600;
            }

            .card-details p {
                font-size: 13px;
                color: #64748b;
                margin-bottom: 16px;
                flex: 1;
                line-height: 1.5;
            }

            .btn-download-card {
                background: #f1f5f9;
                color: #334155;
                border: 1px solid #e2e8f0;
                padding: 9px;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                text-align: center;
            }

            .btn-download-card:hover {
                background: #0284c7;
                color: #fff;
                border-color: #0284c7;
            }

            .text-yellow {
                color: #eab308;
            }

            .text-green {
                color: #10b981;
            }
        </style>
    `
})
export class Dashboard implements OnInit {
    ngOnInit(): void {
        // FAQ veya başlangıç verileri buraya eklenebilir
    }
}

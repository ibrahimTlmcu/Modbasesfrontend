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
                        <span>🟢 <strong>Ahmet_58 </strong> şimdi <em>Cyberpunk 2077 HD Grafik Paketi</em> indirdi (Az önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>KaanGamer </strong> <em>The Witcher 3 Türkçe Yama</em> için 5 yıldız verdi (1 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>ZeynepN </strong> yeni bir mod yükledi: <em>ETS 2 Türkiye Haritası</em> (2 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Burak_TR </strong> <em>Minecraft Shaders</em> paketini indirdi (3 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Selin_Dev </strong> <em>Skyrim Special Edition Türkçe Yama</em> konusuna yorum yaptı (4 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>EmreCan61 </strong> <em>GTA V Realism Mod</em> indirdi (5 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>NightWolf </strong> <em>RDR 2 Türkçe Çeviri</em> dosyasına puan verdi (6 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Merve_06 </strong> yeni bir yama yayınladı: <em>Baldur's Gate 3 Türkçe Çeviri</em> (7 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Cem_B </strong> <em>Mount & Blade II: Bannerlord Diplomacy Mod</em> indirdi (8 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Elif_K </strong> <em>Hogwarts Legacy Türkçe Yama</em> için 5 yıldız verdi (9 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Onur_Pro </strong> <em>Euro Truck Simulator 2 Ses Paketi</em> konusuna yorum yaptı (10 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Deniz_99 </strong> <em>Assetto Corsa Tofaş Doğan SLX Modu</em> indirdi (11 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Kerem_X </strong> <em>Factorio Otomasyon Rehberi</em> konusunu favorilere ekledi (12 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Ayşe_D </strong> <em>Stardew Valley Türkçe Yama</em> için teşekkür mesajı yazdı (13 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Volkan_35 </strong> <em>Mafia Definitive Edition Türkçe Çeviri</em> indirdi (14 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Gizem_S</strong> <em>Detroit Become Human Türkçe Yama</em> hata bildirimi yaptı (15 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Mert_Can</strong> <em>Cities: Skylines Türkiye Bina Paketi</em> yükledi (16 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Ece_G</strong> <em>Resident Evil 4 Remake Türkçe Yama</em> dosyasına 5 yıldız verdi (17 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Baris_T</strong> <em>Fallout 4 Hayatta Kalma Modu</em> indirdi (18 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Yusuf_K</strong> <em>God of War Türkçe Altyazı</em> konusuna yorum yaptı (19 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Nazli_M</strong> yeni bir rehber paylaştı: <em>The Sims 4 Mod Kurulum Rehberi</em> (20 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Emir_58</strong> <em>Dark Souls III Türkçe Yama</em> indirdi (21 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Buse_A</strong> <em>Farming Simulator 22 Türk Traktör Paketi</em> yükledi (22 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Tolga_B</strong> <em>Subnautica Türkçe Çeviri</em> konusuna değerlendirme yaptı (23 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Melis_D</strong> <em>Terraria Kalite Of Life Modu</em> indirdi (24 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Arda_K</strong> <em>Dead Space Remake Türkçe Yama</em> için 5 yıldız verdi (25 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Sude_N</strong> <em>Left 4 Dead 2 Custom Harita</em> yükledi (26 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Kutay_T</strong> <em>Disco Elysium Türkçe Yama</em> hata bildiriminde bulundu (27 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Ceren_L</strong> <em>Portal 2 Hikaye Modu</em> indirdi (28 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Berk_Can</strong> <em>Mass Effect Legendary Edition Türkçe Yama</em> indirdi (29 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>İrem_S</strong> <em>Planet Zoo Hayvan Paketi</em> yükledi (30 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Tarik_M</strong> <em>Horizon Zero Dawn Türkçe Yama</em> konusuna yorum yaptı (31 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Deren_K</strong> <em>BeamNG.drive İstanbul Haritası</em> indirdi (32 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Tolgahan</strong> <em>Alan Wake 2 Türkçe Çeviri</em> için 5 yıldız verdi (33 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Aslı_B</strong> <em>Phasmophobia Türkçe Arayüz Modu</em> yükledi (34 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Umut_X</strong> <em>Outer Wilds Türkçe Yama</em> konusuna destek mesajı yazdı (35 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Yağmur_T</strong> <em>Age of Empires II Türkçe Seslendirme Paketi</em> indirdi (36 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Batuhan_S</strong> <em>Days Gone Türkçe Yama</em> için puanlama yaptı (37 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Dila_N</strong> <em>Sims 4 Gerçekçi Yaşam Modu</em> paylaştı (38 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Doruk_K</strong> <em>Ghost of Tsushima Türkçe Yama</em> konusunu güncelledi (39 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Pelin_M</strong> <em>Stardew Valley Genişletme Modu</em> indirdi (40 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Yiğit_E</strong> <em>Dragon Age: Inquisition Türkçe Yama</em> indirdi (41 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Defne_R</strong> <em>Grand Theft Auto: San Andreas Multiplayer Paketi</em> yükledi (42 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Efe_Can</strong> <em>Cyberpunk 2077 Optimizasyon Modu</em> yorumlarında soru sordu (43 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Naz_K</strong> <em>Valheim Türk Oyuncular Mod Paketi</em> indirdi (44 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 <strong>Kaan_T</strong> <em>Red Dead Redemption 1 PC Türkçe Yama</em> için 5 yıldız verdi (45 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🟢 <strong>Büşra_Ş</strong> <em>Skyrim Görev Modu</em> yükledi (46 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>💬 <strong>Caner_V</strong> <em>The Witcher 2 Türkçe Yama</em> hata çözümüne katkı sağladı (47 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>⚡ <strong>Nil_A</strong> <em>Cities: Skylines 2 Performans Modu</em> indirdi (48 dk önce)</span> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <span>🔥 Son 1 saatte toplam **486 indirme** gerçekleştirildi!</span>
                    </marquee>
                </div>
            </div>

            <!-- Üst Karşılama ve Arama Alanı (Yumuşak Pastel Gradyen) -->
            <div class="welcome-hero">
                <div class="hero-text">
                    <h1>Modindir.com'a Hoş Geldiniz! </h1>
                    <p>En popüler oyun modlarını, Türkçe yamaları ve güvenli yazılımları keşfedin.</p>
                </div>
                <div class="hero-search">
                    <input type="text" placeholder="Mod, yama veya program ara..." />
                    <button type="button"><i class="fa-solid fa-search"></i> Ara</button>
                </div>
            </div>

            <!-- Hızlı İstatistikler / Özet Kartları -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon mod"><i class="fa-solid fa-gamepad"></i></div>
                    <div class="stat-info">
                        <h3>1,450+</h3>
                        <p>Oyun Modu</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon yama"><i class="fa-solid fa-language"></i></div>
                    <div class="stat-info">
                        <h3>320+</h3>
                        <p>Türkçe Yama</p>
                    </div>
                </div>
                <div class="stat-card">
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
                        <h3>Cyberpunk 2077 HD Grafik Paketi</h3>
                        <p>Oyunun grafiklerini ve ışıklandırmasını en üst seviyeye taşıyan mod.</p>
                        <button class="btn-download-card">Hemen İndir</button>
                    </div>
                </div>

                <!-- Kart 2 -->
                <div class="media-card">
                    <div class="card-img-wrap">
                        <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop" alt="Witcher Yama" />
                        <span class="badge yama">Türkçe Yama</span>
                        <span class="live-badge"><i class="fa-solid fa-fire text-yellow"></i> Popüler</span>
                    </div>
                    <div class="card-details">
                        <div class="meta-row">
                            <span><i class="fa-solid fa-download"></i> 32.5K</span>
                            <span><i class="fa-solid fa-star text-yellow"></i> 5.0</span>
                        </div>
                        <h3>The Witcher 3 %100 Türkçe Çeviri</h3>
                        <p>Tüm DLC paketleri dahil profesyonel hikaye ve arayüz çevirisi.</p>
                        <button class="btn-download-card">Hemen İndir</button>
                    </div>
                </div>
                <!-- Kart 2 -->
                <div class="media-card">
                    <div class="card-img-wrap">
                        <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop" alt="Witcher Yama" />
                        <span class="badge yama">Türkçe Yama</span>
                        <span class="live-badge"><i class="fa-solid fa-fire text-yellow"></i> Popüler</span>
                    </div>
                    <div class="card-details">
                        <div class="meta-row">
                            <span><i class="fa-solid fa-download"></i> 32.5K</span>
                            <span><i class="fa-solid fa-star text-yellow"></i> 5.0</span>
                        </div>
                        <h3>The Witcher 3 %100 Türkçe Çeviri</h3>
                        <p>Tüm DLC paketleri dahil profesyonel hikaye ve arayüz çevirisi.</p>
                        <button class="btn-download-card">Hemen İndir</button>
                    </div>
                </div>
                <!-- Kart 3 -->
                <div class="media-card">
                    <div class="card-img-wrap">
                        <img src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=600&auto=format&fit=crop" alt="ETS 2 Mod" />
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
                        <button class="btn-download-card">Hemen İndir</button>
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
                background: linear-gradient(135deg, #3b82f6, #2563eb);
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

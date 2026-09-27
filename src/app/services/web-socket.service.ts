// src/app/services/web-socket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage, MessageType } from '../models/ChatMessage';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
    private client?: Client;
    private sub?: StompSubscription;

    // Bağlı mı? UI'de butonu bu sinyale göre kapatabilirsiniz.
    private connected$ = new BehaviorSubject<boolean>(false);

    // Bağlantı kurulana kadar gönderilecek mesajlar
    private outbox: { destination: string; body: string }[] = [];

    constructor(private http: HttpClient) {}

    /** REST: geçmiş mesajları çek */
    getHistory(roomId: string): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(`http://localhost:8081/api/chat/rooms/${roomId}/history`);
    }

    /** WS: bağlan ve oda kanalına abone ol */
    connect(username: string, roomId: string, onMsg: (m: ChatMessage) => void): void {
        // Zaten aktifse tekrar bağlama
        if (this.client?.active) return;

        this.client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
            reconnectDelay: 5000,
            debug: msg => console.log('[STOMP]', msg),
        });

        this.client.onConnect = () => {
            this.connected$.next(true);

            // Oda kanalına abone ol
            this.sub = this.client!.subscribe(`/topic/room.${roomId}`, frame => {
                onMsg(JSON.parse(frame.body));
            });

            // JOIN gönder (server sessionAttribute için)
            this.publish('/app/chat.addUser', {
                type: MessageType.JOIN,
                sender: username,
                content: '',
                roomId: roomId,
            });

            // Bağlanınca outbox'ı boşalt
            this.flushOutbox();
        };

        this.client.onStompError = err => {
            console.error('[STOMP ERROR]', err);
        };

        this.client.onWebSocketClose = () => {
            this.connected$.next(false);
        };

        this.client.activate();
    }

    sendMessage(msg: ChatMessage, roomId?: string): void {
        if (!msg.roomId && roomId) {
            msg.roomId = roomId;
        }
        this.publish('/app/chat.sendMessage', msg);
    }


    /** Bağlantı durumunu UI'ye açmak istersen */
    isConnected(): Observable<boolean> {
        return this.connected$.asObservable();
    }

    /** Sadece LEAVE mesajı yayınla */
    private leave(roomId: string, username: string): void {
        this.publish('/app/chat.leave', {
            type: MessageType.LEAVE,
            sender: username,
            content: `${username} ayrıldı`,
            roomId
        });
    }

    /**
     * Bağlantıyı kapatır.
     * closeRoom=true ise REST ile odayı kapatır (CLOSED).
     */
    disconnect(roomId: string, username: string, closeRoom: boolean = false): void {
        // 1) LEAVE olayı yayınla (UI "ayrıldı" görsün)
        try {
            this.publish('/app/chat.sendMessage', {
                type: MessageType.LEAVE,
                sender: username,
                content: `${username} ayrıldı`,
                roomId
            });
        } catch {}

        // 2) STOMP kapat
        try {
            this.sub?.unsubscribe();
            this.client?.deactivate();
            this.connected$.next(false);
        } catch {}

        // 3) Odayı kapatma kararı (yalnızca oda sahibi)
        if (closeRoom) {
            const params = new HttpParams().set('by', username);
            this.http.post(`http://localhost:8081/api/rooms/${roomId}/close`, {}, { params })
                .subscribe({
                    next: () => console.log(`Oda ${roomId} kapatıldı (by=${username})`),
                    error: err => console.error('Oda kapatma hatası', err)
                });
        }
    }

    /** publish: bağlıysa anında, değilse outbox'a */
    private publish(destination: string, bodyObj: any): void {
        const body = JSON.stringify(bodyObj);

        if (this.client && this.client.active && this.connected$.value) {
            this.client.publish({
                destination,
                body,
                headers: { 'content-type': 'application/json' }   // ÖNEMLİ: header olmalı
            });
        } else {
            this.outbox.push({ destination, body });
            if (this.client && !this.client.active) {
                this.client.activate();
            }
        }
    }

    /** Bağlantı kurulunca outbox'ı boşalt */
    private flushOutbox(): void {
        if (!this.client || !this.client.active) return;
        for (const m of this.outbox) {
            this.client.publish(m);
        }
        this.outbox = [];
    }
}

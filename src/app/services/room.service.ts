// src/app/services/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomStatus } from '../models/Room';



@Injectable({ providedIn: 'root' })
export class RoomService {
    constructor(private http: HttpClient) {}

    create(subject: string, createdBy: string): Observable<Room> {
        return this.http.post<Room>('http://localhost:8081/api/rooms', { subject, createdBy });
        // proxy yoksa: 'http://localhost:8081/api/rooms'
    }


    get(id: string): Observable<Room> {
        return this.http.get<Room>(`http://localhost:8081/api/rooms/${id}`);
    }

    // src/app/services/room.service.ts
    getAll(status?: RoomStatus): Observable<Room[]> {
        let params = new HttpParams();
        if (status) params = params.set('status', status);
        return this.http.get<Room[]>('http://localhost:8081/api/rooms', { params });
    }




    mine(username: string, status?: RoomStatus): Observable<Room[]> {
        let params = new HttpParams().set('username', username);
        if (status) params = params.set('status', status);
        return this.http.get<Room[]>(`http://localhost:8081/api/rooms/mine`, { params });
    }

    assigned(expert: string, status?: RoomStatus): Observable<Room[]> {
        let params = new HttpParams().set('expert', expert);
        if (status) params = params.set('status', status);
        return this.http.get<Room[]>(`http://localhost:8081/api/rooms/assigned`, { params });
    }
}

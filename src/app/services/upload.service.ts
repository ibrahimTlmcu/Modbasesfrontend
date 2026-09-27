// src/app/services/upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadResponse {
    url: string;
    fileName: string;
    contentType: string;
    image: boolean;
    size: number;
}

@Injectable({ providedIn: 'root' })
export class UploadService {
    constructor(private http: HttpClient) {}

    upload(roomId: string, file: File): Observable<UploadResponse> {
        const fd = new FormData();
        fd.append('file', file, file.name);
        return this.http.post<UploadResponse>(`http://localhost:8081/api/chat/rooms/${roomId}/upload`, fd);
    }
}

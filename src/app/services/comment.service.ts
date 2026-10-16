import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = 'http://localhost:8080/api/comments'; // Backend API adresin

    constructor(private http: HttpClient) {}

    // Moda ait yorumları getir
    getComments(modId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/mod/${modId}`);
    }

    // Yeni yorum ekle
    addComment(commentData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, commentData);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faq } from '../models/Faq';


@Injectable({
    providedIn: 'root'
})
export class FaqService {
    private apiUrl = 'http://localhost:8080/api/faqs';

    constructor(private http: HttpClient) {}

    getFaqs(): Observable<Faq[]> {
        return this.http.get<Faq[]>(this.apiUrl);
    }

    addFaq(faq: Faq): Observable<Faq> {
        return this.http.post<Faq>(this.apiUrl, faq);
    }
}

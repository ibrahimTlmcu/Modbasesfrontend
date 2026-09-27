// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiKey = '1e9c58ca1053a021c8a5eb7041895ef9'; // OpenWeatherMap API anahtarını buraya yaz
    private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(private http: HttpClient) {}

    getWeather(city: string = 'Ankara'): Observable<any> {
        const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=tr`;
        return this.http.get(url);
    }
}

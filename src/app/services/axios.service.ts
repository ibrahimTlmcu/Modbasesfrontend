import { Injectable } from '@angular/core';

import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

    private userName : string | null = null;
    getAuthToken(): string | null {
        return window.localStorage.getItem("auth_token");
    }
    setAuthToken(token: string | null): void {
        if (token !== null) {
            window.localStorage.setItem("auth_token", token);
        } else {
            window.localStorage.removeItem("auth_token");
        }
    }


    setUsername(username: string): void {
        this.userName = username;
        window.localStorage.setItem("username", username);
    }
    getUsername(): string | null {
        return this.userName || window.localStorage.getItem("username");
    }

    constructor() {
       axios.defaults.baseURL = '';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }
    request(method: string, url: string, data: any): Promise<any> {
        let headers: any = {};

        if (url !== '/login' && this.getAuthToken()) {
            headers["Authorization"] = "Bearer " + this.getAuthToken();
        }
        return axios({
            method: method,
            url: url,
            data: data,
            headers: headers
        });
    }

}

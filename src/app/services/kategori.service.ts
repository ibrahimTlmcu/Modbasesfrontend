import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class KategoriService {

  constructor(private axios:AxiosService) { }

    async getKategoriler() : Promise<any[]>{
        const response = await this.axios.request('get', '/api/kategori',"");
        return response.data;
    }
    async addKategori(kategori: any): Promise<any> {
        const response = await this.axios.request('post', '/api/kategori', kategori);
        return response.data;
    }

}

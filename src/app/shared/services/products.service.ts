import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { IProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  httpClient = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.httpClient.get<IProduct[]>('/api/products')
  }

  getById(id: string) {
    return this.httpClient.get<IProduct>(`/api/products/${id}`);
  }

  post(payload: IProductPayload) {
    return this.httpClient.post('/api/products', payload)
  }

  put(id: string, payload: IProductPayload) {
    return this.httpClient.put(`/api/products/${id}`, payload)
  }
}

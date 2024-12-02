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

  post(payload: IProductPayload) {
    return this.httpClient.post('/api/products', payload)
  }
}

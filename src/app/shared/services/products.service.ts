import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<IProduct[]>('/api/products')
  }

  constructor() { }
}

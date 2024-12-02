import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {
  products: IProduct[] = [];

  productService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}

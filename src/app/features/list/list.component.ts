import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {
  products: IProduct[] = [];

  productService = inject(ProductsService);
  router = inject(Router);

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: IProduct): void {
    this.router.navigate(['/edit-product', product.id]);  
  }
}

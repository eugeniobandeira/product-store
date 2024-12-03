import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products = signal<IProduct[]>(inject(ActivatedRoute).snapshot.data['products']);

  productService = inject(ProductsService);
  router = inject(Router);
  confirmationService = inject(ConfirmationDialogService);

  onEdit(product: IProduct): void {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: IProduct): void {
    this.confirmationService
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productService.delete(product.id).subscribe(() => {
          this.productService.getAll().subscribe((products) => {
            this.products.set(products);
          });
        });
    });
  }
}



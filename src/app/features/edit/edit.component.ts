import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  imports: [
    FormComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  product: IProduct = inject(ActivatedRoute).snapshot.data['product'];
  
  onSubmit(product: IProduct) {
    this.productService
    .put(this.product.id, product)  
    .subscribe(() => {
      this.matSnackBar.open('Produto editado com sucesso!', 'Fechar');

      this.router.navigateByUrl('/');
    });
  }
}

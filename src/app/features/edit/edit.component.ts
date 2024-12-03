import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  productService = inject(ProductsService);
  product: IProduct = inject(ActivatedRoute).snapshot.data['product'];
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  
  form = new FormGroup({
    title: new FormControl<string>(this.product.title, { 
      nonNullable: true, 
      validators: Validators.required
    }),
  });

  onSubmit() {
    this.productService.put(this.product.id, {
      title: this.form.controls.title.value
    })  
    .subscribe(() => {
      this.matSnackBar.open('Produto editado com sucesso!', 'Fechar');

      this.router.navigateByUrl('/');
    });
  }
}

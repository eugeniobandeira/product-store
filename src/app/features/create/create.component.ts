import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  
  form = new FormGroup({
    title: new FormControl<string>('', { 
      nonNullable: true, 
      validators: Validators.required
    }),
  });

  onSubmit() {
    this.productService.post({
      title: this.form.controls.title.value
    })  
    .subscribe(() => {
      this.matSnackBar.open('Produto criado com sucesso!', 'Fechar', {
        duration: 5000
      });

      this.router.navigateByUrl('/');
    });
  }
}

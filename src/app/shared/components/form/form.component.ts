import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  product = input<IProduct | null>(null);

  form!: FormGroup;

  @Output() done = new EventEmitter<IProduct>();

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', { 
        nonNullable: true, 
        validators: Validators.required
      }),
    });
  };

  onSubmit() {
    const product = this.form.value as IProduct;

    this.done.emit(product);
  }
}

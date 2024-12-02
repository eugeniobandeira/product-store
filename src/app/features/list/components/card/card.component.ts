import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {

  product = input.required<IProduct>();
  productTitle = computed(() => this.product().title);
}
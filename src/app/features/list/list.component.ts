import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h2 mat-dialog-title>Deletar Produto</h2>
    <mat-dialog-content>Tem certeza que quer deletar esse produto?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNo()">Não</button>
      <button mat-button color="warn" (click)="onYes()" cdkFocusInitial>Sim</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent { 
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products: IProduct[] = [];

  productService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: IProduct): void {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: IProduct): void {
    this.matDialog
    .open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
       this.productService.delete(product.id).subscribe(() => {
        this.productService.getAll().subscribe((products) => {
          this.products = products;
        });
       });
    });    
  }
}

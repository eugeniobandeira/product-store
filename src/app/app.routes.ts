import { Routes } from '@angular/router';
import { getAllProductsResolver } from './shared/services/resolvers/getAll-products.resolver';
import { getProductResolver } from './shared/services/resolvers/get-product.resolver';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            products: getAllProductsResolver
        },
        loadComponent: () => import('./features/list/list.component')
            .then(m => m.ListComponent)
    },
    {
        path: 'create-product',
        loadComponent: () => import('./features/create/create.component')
            .then(m => m.CreateComponent)
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: getProductResolver
        },
        loadComponent: () => import('./features/edit/edit.component')
            .then(m => m.EditComponent)
    },
];

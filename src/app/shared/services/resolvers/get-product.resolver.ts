import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { ProductsService } from "../products.service";

export const getProductResolver = (route: ActivatedRouteSnapshot) => {
    const productService = inject(ProductsService);

    return productService.getById(route.paramMap.get('id') as string);
}
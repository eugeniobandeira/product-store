import { inject } from "@angular/core";
import { ProductsService } from "../products.service";

export const getAllProductsResolver = () => {
    const productService = inject(ProductsService);

    return productService.getAll();
};

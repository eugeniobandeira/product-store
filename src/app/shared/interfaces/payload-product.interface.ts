import { IProduct } from "./product.interface"

export type IProductPayload = Omit<IProduct, 'id'>;
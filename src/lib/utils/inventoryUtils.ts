import { ProductRecord } from "../airtable/interface";

// Look up product info by product id
export const getProductInfo = (productId: string, products: ProductRecord[]): ProductRecord | undefined  => {
    return products.find(x => x.id === productId);
}
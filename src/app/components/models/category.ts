import { Product } from "./product";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  products: {
    items: Product[];
  };
  productCount?: number;
}

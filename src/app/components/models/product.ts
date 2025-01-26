export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  image: {
    sourceUrl: string;
  };
  category: {
    _id: string;
    name: string;
    slug: string;
  };
}

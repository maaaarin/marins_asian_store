export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  picture: string;
  stock: boolean;
  category: string;
  details: {
    brand: string;
    dimensions: { length: number; width: number; height: number };
    contents: number;
    country: string;
  };
  nutrition: {
    calories: number;
    carbohydrates: number;
    proteins: number;
    fats: number;
    sugar: number;
  };
};

export type Item = {
  product: Product;
  quantity: number;
};

export type Bag = {
  items: Item[];
  totalPrice: number;
  totalQuantity: number;
};

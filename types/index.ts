export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    color: string;
    picture: string;
    stock: boolean;
    category: string;
};

export type Item = {
    product: Product;
    quantity: number;
};

export type Bag = {
    items: Item[],
    totalPrice: number,
    totalQuantity: number
}
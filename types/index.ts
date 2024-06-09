import { Types } from "mongoose";

export type User = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  wishlist: string[];
  orders: string[];
};

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
    contents: string;
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

export type ProductItem = {
  _id: string;
  name: string;
  price: number;
  picture: string;
  color: string;
};

export type WishlistItem = {
  _id: string;
  name?: string;
  price?: number;
  picture?: string;
  color?: string;
};

export type Wishlist = {
  wishlist: WishlistItem[];
};

export type CartItem = {
  product: ProductItem;
  quantity: number;
  _id?: string;
};

export type Cart = {
  _id?: string | undefined;
  userClerkId: string | undefined;
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  expireAt: Date | null;
};

export type CheckOutOrder = {
  userClerkId: string;
  items: CartItem[];
  totalAmount: number;
};

export type OrderItem = {
  productId: string | undefined;
  name: string;
  picture: string;
  price: number;
  quantity: number;
};

export type Order = {
  stripeId: string;
  customer: {
    clerkId: string | null;
    name: string | null | undefined;
    email: string | null | undefined;
  };
  items: {
        _id: string | undefined;
        name: string;
        picture: string;
        price: number;
        quantity: number;
      }[] | undefined;
  shippingAddress: {
    street: string | null | undefined;
    city: string | null | undefined;
    state: string | null | undefined;
    postalCode: string | null | undefined;
    country: string | null | undefined;
  };
  totalAmount: number;
  status: string;
  createdAt: Date;
};

export type Achievement = {
  _id: string;
  name: string;
  description: string;
  reward: string;
  goal: number;
};

export type AchievementProgress = {
  achievementId: string;
  status: number;
  completed: boolean;
};

export type Coupon = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expirationHours?: number;
  expirationDate?: string;
};

export type ProductsParams = {
  query?: string;
};

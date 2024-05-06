export type User = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  picture: string;
  // shippingAddress: {
  //   street: string;
  //   city: string;
  //   state: string;
  //   zip: string;
  //   country?: string;
  // };
  // level: number;
  // flavorPoints: number;
  // wishlist: string[];
  // cart: string[];
  // orders: Order[];
  // achievements: AchievementProgress[];
  // coupons: Coupon[];
  // methodPayment: string;
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

export type Cart = {
  items: Item[];
  totalPrice: number;
  totalQuantity: number;
};

export type Order = {
  _id: string;
  stripeId: string;
  placedAt: Date;
  deliveredAt?: Date;
  total: number;
  items: Item[];
  status: string;
  user: UserOrder;
};

type UserOrder = {
  _id: string;
  firstName: string;
  lastName: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
  paymentMethod: string;
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
};

export type Coupon = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expirationHours?: number;
  expirationDate?: string;
};

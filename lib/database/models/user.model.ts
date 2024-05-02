import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String },
});

const achievementProgressSchema = new Schema({
  achievementId: {
    type: Schema.Types.ObjectId,
    ref: "Achievement",
    required: true,
  },
  status: { type: Number, required: true },
});

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  picture: { type: String, required: true },
  shippingAddress: addressSchema,
  level: { type: Number, default: 1 },
  flavorPoints: { type: Number, default: 0 },
  wishlist: [{ type: String }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  achievements: [achievementProgressSchema],
  coupons: [{ type: Schema.Types.ObjectId, ref: "Coupon" }],
  methodPayment: { type: String },
});

const User = models.user || model("User", userSchema);

export default User;

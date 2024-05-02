import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  stripeId: { type: String, required: true, unique: true },
  placedAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: { type: Date },
  total: { type: Number, required: true },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: { type: String, required: true },
});

const Order = models.order || model("Order", orderSchema);

export default Order;

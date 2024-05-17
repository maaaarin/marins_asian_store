import { Schema, model, models } from "mongoose";

// Definir el esquema para Order
const orderSchema: Schema = new Schema({
  stripeId: {
    type: String,
    required: true,
  },
  customer: {
    clerkId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  items: [
    {
      productId: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      picture: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exportar el modelo de Mongoose
const Order = models.Order || model("Order", orderSchema);
export default Order;

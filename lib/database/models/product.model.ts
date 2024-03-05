import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  picture: { type: String, required: true },
});

const Product = models.Product || model("Product", productSchema);

export default Product;

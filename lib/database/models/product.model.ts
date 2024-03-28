import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  stock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  details: {
    brand: {
      type: String,
      required: true,
    },
    dimensions: {
      length: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    contents: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  nutrition: {
    calories: {
      type: Number,
      required: true,
    },
    carbohydrates: {
      type: Number,
      required: true,
    },
    proteins: {
      type: Number,
      required: true,
    },
    fats: {
      type: Number,
      required: true,
    },
    sugar: {
      type: Number,
      required: true,
    },
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;

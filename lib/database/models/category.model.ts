import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  _id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
});

const Category = models.category || model("Category", categorySchema);

export default Category;

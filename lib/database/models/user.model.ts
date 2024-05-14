import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  picture: { type: String, required: true },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const User = models.User || model("User", userSchema);

export default User;

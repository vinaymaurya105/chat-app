import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  pasword: { type: String, required: true },
  icon: { type: String },
});

const UserModel = model("users", UserSchema);

export default UserModel;

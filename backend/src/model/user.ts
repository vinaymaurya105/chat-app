import mongoose, { InferSchemaType, Schema, model } from "mongoose";

type ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  icon: { type: String },
  about: { type: String, default: "Hey there! I am using ChatMingle" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const userModel = model("users", UserSchema);

export type User = InferSchemaType<typeof UserSchema> & {
  _id: ObjectId;
  id: string | ObjectId;
};

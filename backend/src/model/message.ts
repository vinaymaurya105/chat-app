import mongoose, { Schema, model } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
const MessageSchema = new Schema(
  {
    sender: { type: ObjectId, required: true },
    content: { type: String, trim: true },
    chat: { type: ObjectId, true: true },
  },
  { timestamps: true }
);

const messageModel = model("message", MessageSchema);

export default messageModel;

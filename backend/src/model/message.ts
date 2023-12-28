import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
type ObjectId = mongoose.Schema.Types.ObjectId;
const MessageSchema = new Schema(
  {
    sender: { type: ObjectId, required: true },
    content: { type: String, trim: true },
    chat: { type: ObjectId, true: true },
  },
  { timestamps: true }
);

export const messageModel = model("message", MessageSchema);

export type Message = InferSchemaType<typeof MessageSchema> & {
  _id: ObjectId;
};

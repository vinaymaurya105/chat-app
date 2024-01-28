import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
type ObjectId = mongoose.Schema.Types.ObjectId;

const ChatSchema = new Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [ObjectId],
  latestMessage: ObjectId,
  groupAdmin: [ObjectId],
  createdBy: ObjectId, // it is used in groupchat only
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const chatModel = model("chat", ChatSchema);

export type Chat = InferSchemaType<typeof ChatSchema> & {
  _id: ObjectId;
};

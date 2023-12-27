import mongoose, { model, Schema } from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const ChatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [ObjectId],
    latestMessage: ObjectId,
    groupAdmin: ObjectId,
  },
  { timestamps: true }
);

const chatModel = model("chat", ChatSchema);

export default chatModel;

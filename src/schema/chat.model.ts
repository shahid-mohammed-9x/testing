import mongoose, { Document, Schema, Model } from "mongoose";
import modelConstants from "../constants/model.constant";

export interface IMessage {
  _id?: mongoose.Types.ObjectId;
  content?: string;
  role?: "human" | "ai";
  timestamp?: Date;
  metadata?: mongoose.Schema.Types.Mixed;
  tokenUsage?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
  status?: "processing" | "completed" | "failed";
  order?: number;
  error?: string;
}

export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export interface IChatMessage extends Document {
  date: Date;
  deviceType?: DeviceType;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    content: { type: String },
    role: { type: String, enum: ["human", "ai"] },
    timestamp: { type: Date, default: Date.now },
    metadata: Schema.Types.Mixed,
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
    tokenUsage: {
      input_tokens: { type: Number, default: 0 },
      output_tokens: { type: Number, default: 0 },
      total_tokens: { type: Number, default: 0 },
    },
    order: { type: Number, required: true },
    error: { type: String },
  },
  { _id: true },
);

const messageSchema = new Schema<IChatMessage>(
  {
    date: { type: Date, required: true, default: Date.now },
    deviceType: {
      type: String,
      enum: ["mobile", "tablet", "desktop", "unknown"],
      default: "unknown",
    },
    messages: [MessageSchema],
  },
  { timestamps: true },
);

const ChatMessageModel: Model<IChatMessage> = mongoose.model<IChatMessage>(
  modelConstants.chat,
  messageSchema,
);

export default ChatMessageModel;

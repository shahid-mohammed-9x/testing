import mongoose, { Document, Model, Schema } from "mongoose";
import modelConstants from "../constants/model.constant";

export type UserRole = "admin" | "user";

export interface UserInterface extends Document {
  email: string;
  password: string;
  name: string;
  isEmailVerified?: boolean;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLoginAt: Date,
  },
  { timestamps: true },
);

const UserModel: Model<UserInterface> = mongoose.model(
  modelConstants.user,
  userSchema,
);

export default UserModel;

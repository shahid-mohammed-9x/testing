import mongoose, { Document, Model, Schema } from "mongoose";
import modelConstants from "../constants/model.constant";

export interface FormInterface extends Document {
  name: string;
  email: string;
  companyName?: string;
  phoneNumber: string;
  category: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const formSchema = new Schema<FormInterface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    companyName: { type: String, required: false },
    category: { type: String, required: true },
    message: { type: String, required: false },
  },
  { timestamps: true },
);

const FormModel: Model<FormInterface> = mongoose.model(
  modelConstants.form,
  formSchema,
);

export default FormModel;

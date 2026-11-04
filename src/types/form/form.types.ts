import { FormInterface } from "../../schema/form.model";

export type FormSubmissionBody = Pick<
  FormInterface,
  "name" | "email" | "companyName" | "phoneNumber" | "category" | "message"
>;

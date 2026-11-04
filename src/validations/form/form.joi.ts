import { celebrate, Joi } from "celebrate";

export const formSubmissionValidation = celebrate({
  body: Joi.object({
    name: Joi.string().trim().required().label("Name"),
    email: Joi.string().trim().email().required().label("Email"),
    companyName: Joi.string().trim().optional().allow("").label("Company Name"),
    phoneNumber: Joi.string().trim().required().label("Phone Number"),
    category: Joi.string().trim().required().label("Category"),
    message: Joi.string().trim().optional().allow("").label("Message"),
  }).required(),
});

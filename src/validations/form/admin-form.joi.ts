import { celebrate, Joi } from "celebrate";

export const getFormsListValidation = celebrate({
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1).label("Page"),
    limit: Joi.number().integer().min(1).max(100).default(10).label("Limit"),
    search: Joi.string().trim().allow("").optional().label("Search"),
  }),
});

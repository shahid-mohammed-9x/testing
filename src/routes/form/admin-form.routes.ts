import { Router } from "express";
import {
  Authentication,
  Authorization,
} from "../../middlewares/auth.middleware";
import { getFormsListController } from "../../controllers/form/admin-form.controller";
import { getFormsListValidation } from "../../validations/form/admin-form.joi";

const adminFormRoutes = Router();

adminFormRoutes
  .route("/list")
  .get(
    Authentication,
    Authorization("admin"),
    getFormsListValidation,
    getFormsListController,
  );

export default adminFormRoutes;

import { Router } from "express";
import { formSubmissionValidation } from "../../validations/form/form.joi";
import { formSubmissionController } from "../../controllers/form/form.controller";

const formRoutes = Router();

formRoutes
  .route("/new-submission")
  .post(formSubmissionValidation, formSubmissionController);

export default formRoutes;

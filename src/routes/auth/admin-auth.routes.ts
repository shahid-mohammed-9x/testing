import { Router } from "express";
import { loginAuthValidation } from "../../validations/auth/auth.joi";
import { Authentication } from "../../middlewares/auth.middleware";
import {
  loginAuthController,
  logoutAuthController,
} from "../../controllers/auth/auth.controller";

const adminAuthRoutes = Router();

adminAuthRoutes.route("/login").post(loginAuthValidation, loginAuthController);
adminAuthRoutes.route("/logout").get(Authentication, logoutAuthController);

export default adminAuthRoutes;

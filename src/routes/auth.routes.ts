import { Router } from "express";
import { loginAuthValidation } from "../validations/auth/auth.joi";
import { Authentication } from "../middlewares/auth.middleware";
import {
  loginAuthController,
  logoutAuthController,
} from "../controllers/auth/auth.controller";

const authRoutes = Router();

authRoutes.route("/login").post(loginAuthValidation, loginAuthController);
authRoutes.route("/logout").get(Authentication, logoutAuthController);

export default authRoutes;

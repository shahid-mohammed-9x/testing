import { Router } from "express";
import adminFormRoutes from "./form/admin-form.routes";
import adminAuthRoutes from "./auth/admin-auth.routes";
import userRoutes from "./user/user.routes";

const adminRoutes = Router();

adminRoutes.use("/auth", adminAuthRoutes);
adminRoutes.use("/forms", adminFormRoutes);
adminRoutes.use("/user", userRoutes);

export default adminRoutes;

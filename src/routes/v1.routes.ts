import { Router } from "express";
import authRoutes from "./auth.routes";
import chatRoutes from "./chat.routes";

const apiV1Routes = Router();

apiV1Routes.use("/auth", authRoutes);
apiV1Routes.use("/chat", chatRoutes);

export default apiV1Routes;

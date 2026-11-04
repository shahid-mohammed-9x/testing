import { Router } from "express";
import chatRoutes from "./chat/chat.routes";
import formRoutes from "./form/form.routes";
import adminRoutes from "./admin.routes";

const apiV1Routes = Router();

apiV1Routes.use("/chat", chatRoutes);
apiV1Routes.use("/form", formRoutes);
apiV1Routes.use("/admin", adminRoutes);

export default apiV1Routes;

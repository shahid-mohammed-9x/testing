import { Router } from "express";
import { getChatHistoryListController } from "../../controllers/chat/admin-chat.controller";

const adminChatRoutes = Router();

adminChatRoutes.route("/session-list").get(getChatHistoryListController);

export default adminChatRoutes;

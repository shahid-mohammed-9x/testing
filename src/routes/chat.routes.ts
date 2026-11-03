import { Router } from "express";
import { agentChatValidation } from "../validations/chat/chat.joi";
import {
  agentChatController,
  createNewChatSessionController,
  getSessionDetailsController,
} from "../controllers/chat/chat.controller";

const chatRoutes = Router();

chatRoutes.route("/new-chat").post(createNewChatSessionController);

chatRoutes
  .route("/:sessionId")
  .get(getSessionDetailsController)
  .post(agentChatValidation, agentChatController);

export default chatRoutes;

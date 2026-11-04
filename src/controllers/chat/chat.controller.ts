import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import errorHandling, { AppError } from "../../utils/errorHandling.util";
import responseHandlingUtil from "../../utils/responseHandling.util";
import ChatMessageModel from "../../schema/chat.model";
import { parseUserAgent } from "../../helpers/analytics.helper";

export const createNewChatSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userAgent = req.headers["user-agent"] || "unknown";
    console.log(userAgent);
    const { deviceType } = parseUserAgent(userAgent);

    const chatSession = await ChatMessageModel.create({
      messages: [],
      deviceType,
    });

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "Chat session created successfully",
      data: chatSession,
    });
  } catch (error) {
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const agentChatController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { sessionId, chatbotId } = req.params;
    // const { inputQuestion } = req.body;
    // responseHandlingUtil.successResponseStandard(res, {
    //   data: updatedDetails,
    //   otherData: { aiMessageId: lastMessage?._id?.toString() },
    // });
  } catch (error) {
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const getSessionDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sessionId } = req.params;
    const sessionData = await ChatMessageModel.findById(sessionId);

    if (!sessionData) {
      return next(httpErrors.NotFound("Session not found"));
    }

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "session details fetched successfully",
      data: sessionData,
    });
  } catch (error) {
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

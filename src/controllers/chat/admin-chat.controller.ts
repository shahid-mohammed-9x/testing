import { NextFunction, Request, Response } from "express";
import errorHandling, { AppError } from "../../utils/errorHandling.util";
import responseHandlingUtil from "../../utils/responseHandling.util";
import ChatMessageModel from "../../schema/chat.model";
import logger from "../../configs/logger.config";
import httpErrors from "http-errors";

export const getChatHistoryListController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controllers - chat - admin-chat.controller - getChatHistoryListController - Start",
    );
    const { page = "1", limit = "10" } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
    };

    const currentPage = Math.max(1, Number(page) || 1);
    const perPage = Math.min(100, Math.max(1, Number(limit) || 10));
    const skip = (currentPage - 1) * perPage;

    // const searchQuery = search.trim();

    const filter: Record<string, any> = {};

    const [sessions, totalSessionsList] = await Promise.all([
      ChatMessageModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .select("createdAt date title deviceType")
        .lean(),

      ChatMessageModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalSessionsList / perPage);

    logger.info(
      "controllers - chat-history - getChatHistoryListController - End",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Chat history list fetched successfully",
      data: {
        sessionsList: sessions,
        pagination: {
          totalDocs: totalSessionsList,
          totalPages,
          currentPage,
          limit: perPage,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        },
      },
    });
  } catch (error) {
    logger.error(
      "controllers - chat-history - getChatHistoryListController - Error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const getSessionDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controllers - chat - admin-chat.controller - getSessionDetailsController - Start",
    );
    const { sessionId } = req.params;
    const sessionData = await ChatMessageModel.findById(sessionId);

    if (!sessionData) {
      return next(httpErrors.NotFound("Session not found"));
    }

    logger.info(
      "controllers - chat - admin-chat.controller - getSessionDetailsController - Error",
    );

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "session details fetched successfully",
      data: sessionData,
    });
  } catch (error) {
    logger.error(
      "controllers - chat - admin-chat.controller - getSessionDetailsController - Error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

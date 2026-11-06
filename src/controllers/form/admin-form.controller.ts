import { Request, Response, NextFunction } from "express";
import FormModel from "../../schema/form.model";
import errorHandling, { AppError } from "../../utils/errorHandling.util";
import responseHandlingUtil from "../../utils/responseHandling.util";
import logger from "../../configs/logger.config";

export const getFormsListController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controllers - form - form.controller - getFormsController - Start",
    );

    const {
      page = "1",
      limit = "10",
      search = "",
    } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
    };

    const currentPage = Math.max(1, Number(page) || 1);
    const perPage = Math.min(100, Math.max(1, Number(limit) || 10));
    const skip = (currentPage - 1) * perPage;

    const searchQuery = search.trim();

    const filter: Record<string, any> = {};

    if (searchQuery) {
      const escapedSearch = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(escapedSearch, "i");

      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { companyName: searchRegex },
        { phoneNumber: searchRegex },
        { category: searchRegex },
        { message: searchRegex },
      ];
    }

    const [forms, totalForms] = await Promise.all([
      FormModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .lean(),

      FormModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalForms / perPage);

    logger.info(
      "controllers - form - form.controller - getFormsController - End",
    );

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "Forms fetched successfully",
      data: {
        forms,
        pagination: {
          totalDocs: totalForms,
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
      "controllers - form - form.controller - getFormsController - Error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

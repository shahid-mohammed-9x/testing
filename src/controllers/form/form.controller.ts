import { Request, Response, NextFunction } from "express";
import FormModel from "../../schema/form.model";
import errorHandling, { AppError } from "../../utils/errorHandling.util";
import responseHandlingUtil from "../../utils/responseHandling.util";
import logger from "../../configs/logger.config";
import { FormSubmissionBody } from "../../types/form/form.types";

export const formSubmissionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controllers - form - form.controller - formSubmissionController - Start",
    );

    const { name, email, companyName, phoneNumber, category, message } =
      req.body as FormSubmissionBody;

    const form = await FormModel.create({
      name,
      email,
      companyName,
      phoneNumber,
      category,
      message,
    });

    logger.info(
      "controllers - form - form.controller - formSubmissionController - End",
    );

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 201,
      message: "Form submitted successfully",
      data: {
        form,
      },
    });
  } catch (error) {
    logger.error(
      "controllers - form - form.controller - formSubmissionController - Error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

import { Request, Response, NextFunction } from "express";
import httpError from "http-errors";
import errorHandling, { AppError } from "../../utils/errorHandling.util";
import responseHandlingUtil from "../../utils/responseHandling.util";
import { LoginAuthBody } from "../../types/auth/auth.types";
import UserModel from "../../schema/user.model";
import { createAccessToken } from "../../utils/jwt.util";
import { verifyPasswordMethod } from "../../utils/bcrypt.util";
import logger from "../../configs/logger.config";

export const loginAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controllers - users - auth.controller - loginAuthController - Start",
    );
    const { email, password } = req.body as LoginAuthBody;

    const user = await UserModel.findOneAndUpdate(
      { email, role: "admin" },
      { lastLoginAt: new Date() },
      { new: true },
    )
      .select("+password")
      .lean();
    if (!user) {
      return next(httpError.BadRequest("Invalid Email or Password"));
    }

    const isPasswordValid = await verifyPasswordMethod(password, user.password);
    if (!isPasswordValid) {
      return next(httpError.BadRequest("Invalid Email or Password"));
    }

    const accessToken = await createAccessToken(user?._id?.toString());

    const { password: _, ...userDetails } = user;

    logger.info(
      "controllers - users - auth.controller - loginAuthController - End",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        userDetails,
        accessToken,
      },
    });
  } catch (error) {
    logger.error(
      "controllers - users - auth.controller - loginAuthController - Error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const logoutAuthController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controllers - users - auth.controller - logoutAuthController - Start",
    );

    logger.info(
      "controllers - users - auth.controller - logoutAuthController - End",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    logger.error(
      "controllers - users - auth.controller - logoutAuthController - Error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

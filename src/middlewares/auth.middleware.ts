import { Response, NextFunction, Request } from "express";
import httpErrors from "http-errors";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import { verifyAccessToken } from "../utils/jwt.util";
import UserModel, { UserRole } from "../schema/user.model";
import config from "../configs/index.config";
import logger from "../configs/logger.config";

export const Authentication = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  try {
    let authHeader = req.header("Authorization");

    // Validate token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized("Authentication token required"));
    }

    // Extract and verify token
    const token = authHeader.split(" ")[1];

    const decode = await verifyAccessToken(token);

    if (!decode.success || !decode.id) {
      const errorMessage = decode.error?.message || "Invalid token";
      return next(httpErrors.Unauthorized(errorMessage));
    }

    let userExist = await UserModel.findById(decode?.id).lean();

    if (!userExist) return next(httpErrors.NotFound("user not found"));

    req.authUser = {
      _id: userExist?._id,
      email: userExist?.email,
      name: userExist?.name,
      role: userExist?.role,
    };
    logger.info(`name : ${userExist.name} email: ${userExist.email}`);
    next();
  } catch (error) {
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const DevelopmentAuthentication = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  try {
    const userId = config.DEVELOPMENT_USER_ID;
    if (!userId)
      return next(
        httpErrors.InternalServerError("Development user ID is not set"),
      );
    const userExist = await UserModel.findById(userId).lean();

    if (!userExist) return next(httpErrors.NotFound("user not found"));

    req.authUser = {
      _id: userExist?._id,
      email: userExist?.email,
      name: userExist?.name,
      role: userExist?.role,
    };
    logger.info(`name : ${userExist.name} email: ${userExist.email}`);

    next();
  } catch (error) {
    next(httpErrors.InternalServerError("Internal server error"));
  }
};

// authorization depending  upon a role
export const Authorization = (...roles: UserRole[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const currentRole = req?.authUser?.role || null;
    if (currentRole && !roles.includes(currentRole)) {
      return next(httpErrors.Unauthorized("Authentication token required"));
    }
    next();
  };
};

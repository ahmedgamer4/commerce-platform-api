import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../../models/Admin";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const admin = new AdminModel();

const validateAdmin = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const authenticatedUserRole = req.role;
  // Check if user is authenticated
  if (!authenticatedUserId || !authenticatedUserRole) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Check if user is admin
  if (authenticatedUserRole !== "admin") {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  // Check if admin exists
  let adminData;
  try {
    adminData = await admin.showAdmin(authenticatedUserId);
  } catch (error) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  if (!adminData) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  next();
};

export default validateAdmin;

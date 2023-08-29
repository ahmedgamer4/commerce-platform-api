import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const validateAdmin = (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const authenticatedUserRole = req.role;
  // Check if user is authenticated
  if (!authenticatedUserId || !authenticatedUserRole) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Check if user is employee
  if (authenticatedUserRole !== "employee") {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }
  next();
};

export default validateAdmin;

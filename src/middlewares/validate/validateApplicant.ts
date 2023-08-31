import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicantModel } from "../../models/Applicant";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const applicant = new ApplicantModel();

const validateApplicant = async (
  req: REQ,
  res: Response,
  next: NextFunction
) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const authenticatedUserRole = req.role;
  // Check if user is authenticated
  if (!authenticatedUserId || !authenticatedUserRole) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Check if user is applicant
  if (authenticatedUserRole !== "applicant") {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  // Check if applicant exists
  let applicantData;
  try {
    applicantData = await applicant.showApplicant(authenticatedUserId);
  } catch (error) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  if (!applicantData) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  next();
};

export default validateApplicant;

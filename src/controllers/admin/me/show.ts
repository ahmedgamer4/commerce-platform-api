import { AdminModel } from "../../../models/Admin";
import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";

interface REQ extends Request {
  userId?: string;
  role?: string;
  collageId?: string;
}

const admin = new AdminModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const collageId = req.collageId;
  const authenticatedUserId = req.userId;
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Get admin data
  let adminData;
  try {
    adminData = await admin.showAdmin(authenticatedUserId, collageId as string);
  } catch (error) {
    return next(error);
  }
  // Check if admin exists
  if (!adminData) {
    const mes = "admin not found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "admin found successfully.",
    data: {
      master: {
        id: adminData.id,
        name: adminData.name,
        email: adminData.email,
      },
    },
  });
};

export default show;

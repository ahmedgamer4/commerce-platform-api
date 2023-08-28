import { MasterModel } from "../../../models/Master";
import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const master = new MasterModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const authenticatedUserRole = req.role;
  console.log(authenticatedUserId);
  console.log(authenticatedUserRole);
  // Check if user is authenticated
  if (!authenticatedUserId || !authenticatedUserRole) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Check if user is master
  if (authenticatedUserRole !== "master") {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }
  // Get master data
  let masterData;
  try {
    masterData = await master.showMaster(authenticatedUserId);
  } catch (error) {
    return next(error);
  }
  // Check if master exists
  if (!masterData) {
    const mes = "Master not found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "Master found successfully.",
    data: {
      master: {
        id: masterData.id,
        name: masterData.name,
        email: masterData.email,
      },
    },
  });
};

export default show;

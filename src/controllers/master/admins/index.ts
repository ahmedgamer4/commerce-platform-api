import { AdminModel } from "../../../models/Admin";
import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";

const admin = new AdminModel();

const indexAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  let admins;
  try {
    admins = await admin.indexAdmin(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if admins were found
  if (!admins || admins.count === 0) {
    return next(new HttpError("No admins found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Admins found successfully.",
    data: {
      ...admins,
    },
  });
};

export default indexAdmin;

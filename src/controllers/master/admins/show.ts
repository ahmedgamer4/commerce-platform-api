import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../../../models/Admin";

const admin = new AdminModel();

const showAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = (req as any).collageId;

  // Validate data
  if (!id) {
    return next(new HttpError("Invalid id", 400));
  }

  // Retrieve admin
  let retrievedAdmin;
  try {
    retrievedAdmin = await admin.show(id, collageId);
  } catch (err) {
    return next(err);
  }

  // Check if admin was found
  if (!retrievedAdmin) {
    return next(new HttpError("Could not retrieve admin", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Admin retrieved successfully",
    data: {
      admin: retrievedAdmin,
    },
  });
};

export default showAdmin;

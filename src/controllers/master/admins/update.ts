import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../../../models/Admin";

const admin = new AdminModel();

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = (req as any).collageId;
  const { name, password, email } = req.body;

  // Validate data
  if (!name && !password && !email) {
    return next(new HttpError("Please provide name or password", 400));
  }

  // Update admin
  let updatedAdmin;
  try {
    updatedAdmin = await admin.update(id, name, password, email, collageId);
  } catch (err) {
    return next(err);
  }

  // Check if admin was updated
  if (!updatedAdmin) {
    return next(new HttpError("Could not update admin", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Admin updated successfully",
    data: {
      admin: updatedAdmin,
    },
  });
};

export default updateAdmin;

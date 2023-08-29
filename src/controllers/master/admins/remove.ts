import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../../../models/Admin";

const admin = new AdminModel();

const removeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;
  const collageId = (req as any).collageId;

  // Validate data
  if (!id) {
    return next(new HttpError("Invalid id", 400));
  }

  // Retrieve admin
  let removedAdmin;
  try {
    removedAdmin = await admin.deleteAdmin(id, collageId);
  } catch (err) {
    return next(err);
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Admin removed successfully",
    data: {
      admin: removedAdmin,
    },
  });
};

export default removeAdmin;

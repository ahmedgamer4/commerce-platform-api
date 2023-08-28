import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../../../models/Admin";

const admin = new AdminModel();

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const collageId = (req as any).collageId;
  const { name, email, password } = req.body;

  console.log(collageId);
  console.log(req.originalUrl);

  // Validate data
  if (!name || !email || !password) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create admin
  let newAdmin;
  try {
    newAdmin = await admin.createAdmin(name, email, password, collageId);
  } catch (error) {
    return next(error);
  }

  // Check if admin was created
  if (!newAdmin) {
    return next(new HttpError("Could not create admin", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Admin created successfully",
    data: {
      admin: newAdmin,
    },
  });
};

export default createAdmin;

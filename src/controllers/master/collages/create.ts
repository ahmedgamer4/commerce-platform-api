import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageModel } from "../../../models/Collage";

const collage = new CollageModel();

const create = async (req: Request, res: Response, next: NextFunction) => {
  // Get data
  const { name, universityName } = req.body;

  // Validate data
  if (!name || !universityName) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create collage
  let newCollage;
  try {
    newCollage = await collage.createCollage(name, universityName);
  } catch (error) {
    return next(error);
  }

  // Check if collage was created
  if (!newCollage) {
    return next(new HttpError("Could not create collage", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Collage created successfully",
    data: {
      collage: newCollage,
    },
  });
};

export default create;

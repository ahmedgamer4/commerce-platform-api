import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageModel } from "../../../models/Collage";

const collage = new CollageModel();

const update = async (req: Request, res: Response, next: NextFunction) => {
  // Get collage id
  const id = req.params.id;

  // Get collage name and university name
  const { name, universityName } = req.body;

  // Check if collage name or university name is provided
  if (!name && !universityName) {
    return next(
      new HttpError("Please provide collage name or university name.", 400)
    );
  }

  let updatedCollage;
  try {
    updatedCollage = await collage.updateCollage(name, universityName, id);
  } catch (error) {
    return next(error);
  }

  // Check if collage was updated
  if (!updatedCollage) {
    return next(new HttpError("Collage not updated.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Collage updated successfully.",
    data: {
      collage: updatedCollage,
    },
  });
};

export default update;

import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageModel } from "../../../models/Collage";

const collage = new CollageModel();

const remove = async (req: Request, res: Response, next: NextFunction) => {
  // Get collage id
  const id = req.params.id;

  let deletedCollage;
  try {
    deletedCollage = await collage.removeCollage(id);
  } catch (error) {
    return next(error);
  }

  // Check if collage was deleted
  if (!deletedCollage) {
    return next(new HttpError("Collage not deleted.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Collage deleted successfully.",
    data: {
      collage: deletedCollage,
    },
  });
};

export default remove;

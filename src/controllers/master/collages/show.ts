import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageModel } from "../../../models/Collage";

const collage = new CollageModel();

const show = async (req: Request, res: Response, next: NextFunction) => {
  // Get collage id
  const id = req.params.id;

  let fetchedCollage;
  try {
    fetchedCollage = await collage.showCollage(id);
  } catch (error) {
    return next(error);
  }

  // Check if collage was found
  if (!collage) {
    return next(new HttpError("Collage not found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Collage found successfully.",
    data: {
      collage: fetchedCollage,
    },
  });
};

export default show;

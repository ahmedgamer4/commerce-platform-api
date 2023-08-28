import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageModel } from "../../../models/Collage";

const collage = new CollageModel();

const index = async (req: Request, res: Response, next: NextFunction) => {
  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  let collages;
  try {
    collages = await collage.indexCollages(page, limit);
  } catch (error) {
    return next(error);
  }

  // Check if collages were found
  if (!collages || collages.count === 0) {
    return next(new HttpError("No collages found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Collages found successfully.",
    data: {
      ...collages,
    },
  });
};

export default index;

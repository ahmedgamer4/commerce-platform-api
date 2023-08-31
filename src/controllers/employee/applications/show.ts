import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicationModel } from "../../../models/Application";
import { StorageModel } from "../../../models/storage";

interface REQ extends Request {
  collageId?: string;
  programId?: string;
}

const application = new ApplicationModel();
const storage = new StorageModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let result: any;
  try {
    result = await application.showApplicationById(id);
  } catch (error) {
    const mes = "Could not show application.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Check if application was found
  if (!result) {
    const mes = "Could not show application.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Generate aws s3 presigned url to access files
  let files;
  try {
    files = await storage.findStorageByOwnerId(id as string);
  } catch (error) {
    console.log(error);
    const mes = "Could not show application.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  res.json({
    status: "success",
    message: "Application shown.",
    data: {
      ...result,
      files,
    },
  });
};

export default show;

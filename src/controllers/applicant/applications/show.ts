import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicationModel } from "../../../models/Application";

interface REQ extends Request {
  collageId?: string;
  programId?: string;
  userId?: string;
}

const applicationModel = new ApplicationModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  const { userId } = req;
  const { id } = req.params;

  let result: any;
  try {
    result = await applicationModel.showApplicationById(id);
  } catch (error) {
    const mes = "Could not show application.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Check if the user is the owner of the application
  if (result.application.applicant_id !== userId) {
    const mes = "You are not the owner of this application.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  res.json({
    status: "success",
    message: "Application shown.",
    data: {
      ...result,
    },
  });
};

export default show;

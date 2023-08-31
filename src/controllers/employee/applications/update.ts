import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicationModel } from "../../../models/Application";

interface REQ extends Request {
  collageId?: string;
  programId?: string;
}

const application = new ApplicationModel();

const update = async (req: REQ, res: Response, next: NextFunction) => {
  // Get application id
  const { id } = req.params;

  // Get application data
  const { status, feedback, applying_fees_status, program_fees_status } =
    req.body;

  if (!status || !feedback || !applying_fees_status || !program_fees_status) {
    const mes = "Invalid inputs passed, please check your data.";
    const statusCode = 422;
    return next(new HttpError(mes, statusCode));
  }

  let result: any;
  try {
    const result = await application.updateApplicationById(
      id,
      status,
      feedback,
      applying_fees_status,
      program_fees_status
    );
  } catch (error) {
    const mes = "Could not update application.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  res.json({
    status: "success",
    message: "Application updated.",
    data: {
      ...result,
    },
  });
};

export default update;

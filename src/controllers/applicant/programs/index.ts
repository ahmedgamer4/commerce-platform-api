import { ProgramModel } from "../../../models/Program";
import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";

interface REQ extends Request {
  collageId?: string;
}

const program = new ProgramModel();

const index = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const collageId = req.collageId;

  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  // Get programs
  let programs;
  try {
    programs = await program.indexPrograms(page, limit, collageId as string);
  } catch (err) {
    const mes = "Fetching programs failed, please try again later.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Programs fetched successfully.",
    data: {
      programs: programs.programs,
      count: programs.count,
    },
  });
};

export default index;

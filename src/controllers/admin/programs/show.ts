import { ProgramModel } from "../../../models/Program";
import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";

interface REQ extends Request {
  collageId?: string;
}

const program = new ProgramModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const collageId = req.collageId;

  // Get program id
  const { id } = req.params;
  if (!id) {
    const mes = "Invalid inputs passed, please check your data.";
    const statusCode = 422;
    return next(new HttpError(mes, statusCode));
  }

  // Show program
  let fetchedProgram;
  try {
    fetchedProgram = await program.showProgram(id, collageId as string);
  } catch (err) {
    const mes = "Fetching program failed, please try again later.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Program fetched successfully.",
    data: {
      program: fetchedProgram,
    },
  });
};

export default show;

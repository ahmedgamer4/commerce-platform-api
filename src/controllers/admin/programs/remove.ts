import { ProgramModel } from "../../../models/Program";
import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";

interface REQ extends Request {
  collageId?: string;
}

const program = new ProgramModel();

const remove = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const collageId = req.collageId;

  // Get program id
  const { id } = req.params;
  if (!id) {
    const mes = "Invalid inputs passed, please check your data.";
    const statusCode = 422;
    return next(new HttpError(mes, statusCode));
  }

  // Remove program
  try {
    await program.deleteProgram(id, collageId as string);
  } catch (err) {
    const mes = `Could not remove program: ${(err as HttpError).message}`;
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Send response
  res
    .status(200)
    .json({ status: "success", message: "Program removed successfully." });
};

export default remove;

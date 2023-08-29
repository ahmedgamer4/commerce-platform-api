import { ProgramModel } from "../../../models/Program";
import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";

interface REQ extends Request {
  collageId?: string;
}

const program = new ProgramModel();

const create = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const collageId = req.collageId;

  // Get data from body name, description, applying_fees, program_fees, open_at, close_at, credit_hour_fees, collage_id
  const {
    name,
    description,
    applying_fees,
    program_fees,
    open_at,
    close_at,
    credit_hour_fees,
  } = req.body;
  if (
    !name ||
    !description ||
    !applying_fees ||
    !program_fees ||
    !open_at ||
    !close_at ||
    !credit_hour_fees
  ) {
    const mes = "Invalid inputs passed, please check your data.";
    const statusCode = 422;
    return next(new HttpError(mes, statusCode));
  }

  // Create new program
  let newProgram;
  try {
    newProgram = await program.createProgram(
      name,
      description,
      applying_fees,
      program_fees,
      open_at,
      close_at,
      credit_hour_fees,
      collageId as string
    );
  } catch (err) {
    const mes = "Creating program failed, please try again later.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Program created successfully.",
    data: {
      program: newProgram,
    },
  });
};

export default create;
